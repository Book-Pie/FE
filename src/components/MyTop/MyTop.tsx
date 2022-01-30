import noProfileImg from "assets/image/noProfile.jpg";
import Button from "@mui/material/Button";
import { useState, useCallback, useMemo } from "react";
import { userInfoAsync, nickNameUpdateAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { hookFormSpecialChractersCheck, makeOption, FormErrorMessages } from "utils/hookFormUtil";
import ErrorMessage from "elements/ErrorMessage";
import { Input } from "@mui/material";
import Popup from "elements/Popup";
import { dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { Link } from "react-router-dom";
import usePopup from "hooks/usePopup";
import * as Styled from "./style";
import * as Types from "./types";
import PointInfo from "./PointInfo";
import Skeletons from "./Skeletons";

const MyTop = () => {
  const [isNickNameUpdateOpne, setIsNickNameUpdateOpen] = useState<boolean>(false);
  const { handleSubmit, control, formState, clearErrors } = useForm<Types.NickNameForm>({
    defaultValues: {
      nickName: "",
    },
  });
  const { handlePopupClose, handlePopupMessage, popupState } = usePopup();
  const { isOpen, isSuccess, message } = popupState;
  const dispatch = useAppDispatch();
  const { errors } = formState;
  const { user, token } = useTypedSelector(userReduceSelector);

  const nickNameOptions = useMemo<RegisterOptions>(
    () => ({
      maxLength: makeOption<number>(10, FormErrorMessages.MAX_LENGTH),
      minLength: makeOption<number>(3, FormErrorMessages.MIN_LENGTH),
      required: makeOption<boolean>(true, FormErrorMessages.NICKNAME_REQUIRED),
      validate: {
        specialChracters: value => hookFormSpecialChractersCheck(value, FormErrorMessages.SPECIAL_CHARACTERS),
      },
    }),
    [],
  );
  const handlePaymentPopUpOnClick = useCallback(() => {
    const name = "북파이 결제페이지";
    const url = "/payment";
    const popupX = window.screen.width / 2 - 200 / 2;
    const popupY = window.screen.height / 2 - 300 / 2;
    const option = `width = 850, height = 600, top = ${popupY}, left = ${popupX}, screenX=${popupX} screenY=${popupY} resizable=no`;
    const win = window.open(url, name, option);
    win?.addEventListener("beforeunload", () => {
      if (token) dispatch(userInfoAsync(token));
    });
  }, [token, dispatch]);

  const handleNickNameUpdateOpen = useCallback(() => {
    setIsNickNameUpdateOpen(prev => !prev);
    clearErrors();
  }, [clearErrors]);

  const handleNicknameUpdate = useCallback(
    async ({ nickName }: Types.NickNameForm) => {
      try {
        if (!token) throw new Error("로그인을 해주세요.");
        const { payload } = await dispatch(nickNameUpdateAsync({ nickName, token }));
        setIsNickNameUpdateOpen(false);
        handlePopupMessage(false, payload ?? "닉네임변경에 성공했습니다.");
      } catch (error: any) {
        handlePopupMessage(false, error);
      }
    },
    [token, dispatch, handlePopupMessage],
  );

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={handlePopupClose} autoClose className={isSuccess ? "green" : "red"}>
          {message}
        </Popup>
      )}
      <Styled.MyTopWrapper>
        {user ? (
          <div>
            <Styled.ProfileImg>
              <img src={user.image ? `${process.env.BASE_URL}/image/${user.image}` : noProfileImg} alt="myProfileImg" />
            </Styled.ProfileImg>
            <Styled.MyTopUserInfo>
              <PointInfo />
              <div>
                <span>{user.nickName}</span>
                <Button color="mainDarkBrown" variant="contained" onClick={handleNickNameUpdateOpen}>
                  {isNickNameUpdateOpne ? "취소" : "닉네임변경"}
                </Button>
              </div>
              {isNickNameUpdateOpne && (
                <form onSubmit={handleSubmit(handleNicknameUpdate)}>
                  <Controller
                    name="nickName"
                    control={control}
                    rules={nickNameOptions}
                    render={({ field }) => <Input {...field} placeholder="닉네임 입력" sx={{ width: "50%" }} />}
                  />

                  <Button color="mainDarkBrown" variant="contained" type="submit">
                    변경하기
                  </Button>
                </form>
              )}
              <ErrorMessage message={errors.nickName?.message} />
              <div>
                <span>회원가입일</span> <span>{dateArrayFormat(user.createDate)[0]}</span>
              </div>
              <div>
                <span>남은 포인트</span>
                <span>{`${make1000UnitsCommaFormet(String(user.point.holdPoint))}점`}</span>
              </div>
              <div>
                <Button color="mainDarkBrown" variant="contained" onClick={handlePaymentPopUpOnClick}>
                  포인트 충전
                </Button>
              </div>
              <div>
                <Link to="point">
                  <Button color="info" variant="contained">
                    충전 내역 확인
                  </Button>
                </Link>
              </div>
            </Styled.MyTopUserInfo>
          </div>
        ) : (
          <Skeletons />
        )}
        <div>차트</div>
      </Styled.MyTopWrapper>
    </>
  );
};

export default MyTop;
