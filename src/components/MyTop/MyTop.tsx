import noProfileImg from "assets/image/noProfile.jpg";
import Button from "@mui/material/Button";
import { useState, useCallback, useMemo } from "react";
import { nickNameUpdateAsync, signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { hookFormSpecialChractersCheck, makeOption, FormErrorMessages } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { Skeleton, Input } from "@mui/material";
import Popup from "src/elements/Popup";
import { make1000UnitsCommaFormet } from "src/utils/formatUtil";
import { useAppDispatch, useTypedSelector } from "src/modules/store";
import * as Styled from "./style";
import * as Types from "./type";
import PointInfo from "./PointInfo";

const MyTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
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
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className={popUpState.isSuccess ? "green" : "red"}>
          {popUpState.message}
        </Popup>
      )}
      <Styled.MyTopWrapper>
        {user ? (
          <div>
            <Styled.ProfileImg>
              {user.image ? (
                <img src={`${process.env.BASE_URL}/image/${user.image}`} alt="myProfileImg" />
              ) : (
                <img src={noProfileImg} alt="noProfileImg" />
              )}
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
                <span>회원가입일</span> <span>{user.createDate.split("T")[0].replaceAll("-", ".") ?? ""}</span>
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
            </Styled.MyTopUserInfo>
          </div>
        ) : (
          <div>
            <Styled.ProfileImg>
              <div>
                <Skeleton variant="circular" width={200} height={200} animation="wave" />
              </div>
            </Styled.ProfileImg>
            <Styled.MyTopUserInfo>
              <div>
                <Skeleton variant="text" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
                <Skeleton variant="rectangular" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
              </div>
              <div>
                <Skeleton variant="text" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
                <Skeleton variant="rectangular" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
              </div>
              <div>
                <Skeleton variant="text" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
                <Skeleton variant="rectangular" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
              </div>
              <div>
                <Skeleton variant="text" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
                <Skeleton variant="rectangular" width={150} height={50} animation="wave" sx={{ borderRadius: "5px" }} />
              </div>
            </Styled.MyTopUserInfo>
          </div>
        )}
        <div>차트</div>
      </Styled.MyTopWrapper>
    </>
  );
};

export default MyTop;
