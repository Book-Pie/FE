import noProfileImg from "assets/image/noProfile.jpg";
import Button from "@mui/material/Button";
import { useState, useCallback, useMemo } from "react";
import { nickNameUpdateAsync, signInSelector } from "modules/Slices/signIn/signInSlice";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { hookFormSpecialChractersCheck, makeOption, FormErrorMessages } from "utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { Input } from "@mui/material";
import Popup from "src/elements/Popup";
import { dateFormat2, make1000UnitsCommaFormet } from "utils/formatUtil";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { Link } from "react-router-dom";
import * as Styled from "./style";
import * as Types from "./types";
import PointInfo from "./PointInfo";
import Skeletons from "./Skeletons";

const MyTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const { isSuccess, message } = popUpState;
  const [isNickNameUpdateOpne, setIsNickNameUpdateOpen] = useState<boolean>(false);
  const { handleSubmit, control, formState, clearErrors } = useForm<Types.NickNameForm>({
    defaultValues: {
      nickName: "",
    },
  });
  const signIn = useTypedSelector(signInSelector);
  const dispatch = useAppDispatch();
  const { errors } = formState;
  const { user, token } = signIn;

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

  const handlePopUpMessage = useCallback((isSuccess: boolean, message: string) => {
    setIsOpen(true);
    setPopUpState({
      isSuccess,
      message,
    });
  }, []);

  const handlePaymentPopUpOnClick = useCallback(() => {
    const name = "북파이 결제페이지";
    const url = "/payment";
    const popupX = window.screen.width / 2 - 200 / 2;
    const popupY = window.screen.height / 2 - 300 / 2;
    const option = `width = 850, height = 600, top = ${popupY}, left = ${popupX}, screenX=${popupX} screenY=${popupY} resizable=no`;
    const win = window.open(url, name, option);
    win?.addEventListener("beforeunload", () => window.location.reload());
  }, []);

  const handleNickNameUpdateOpen = useCallback(() => {
    setIsNickNameUpdateOpen(prev => !prev);
    clearErrors();
  }, [clearErrors]);

  const handleNickNameUpdate = useCallback(
    (formDate: Types.NickNameForm) => {
      const { nickName } = formDate;
      if (token) {
        dispatch(nickNameUpdateAsync({ nickName, token }))
          .unwrap()
          .then(({ message }) => {
            setIsNickNameUpdateOpen(false);
            handlePopUpMessage(true, message);
          })
          .catch(({ message }) => handlePopUpMessage(false, message));
      }
    },
    [token, dispatch, handlePopUpMessage],
  );

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className={isSuccess ? "green" : "red"}>
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
                <form onSubmit={handleSubmit(handleNickNameUpdate)}>
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
                <span>회원가입일</span> <span>{dateFormat2(user.createDate)[0]}</span>
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
