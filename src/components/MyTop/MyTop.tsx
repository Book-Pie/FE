import noProfileImg from "assets/image/noProfile.jpg";
import Button from "@mui/material/Button";
import { useState, useCallback, useMemo } from "react";
import useSignIn from "src/hooks/useSignIn";
import { nickNameUpdateAsync } from "src/modules/Slices/signIn/signInSlice";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { hookFormSpecialChractersCheck, makeOption } from "src/utils/hookFormUtil";
import ErrorMessage from "src/elements/ErrorMessage";
import { Skeleton } from "@mui/material";
import Popup from "src/elements/Popup";
import { FormErrorMessages } from "../SignUpForm/types";
import { ProfileImg, UserInfoMation, Wrapper, CustomInput } from "./style";
import { NickNameForm } from "./type";

const MyTop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [popUpState, setPopUpState] = useState({
    isSuccess: false,
    message: "",
  });
  const [isNickNameUpdateOpne, setIsNickNameUpdateOpen] = useState<boolean>(false);
  const { handleSubmit, control, formState, clearErrors } = useForm<NickNameForm>({
    defaultValues: {
      nickName: "",
    },
  });
  const { signIn, dispatch } = useSignIn();
  const { errors } = formState;
  const { user, token } = signIn;

  const options = useMemo<RegisterOptions>(
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

  const handleNickNameUpdateOpen = useCallback(() => {
    setIsNickNameUpdateOpen(prev => !prev);
    clearErrors();
  }, [clearErrors]);

  const handleNickNameUpdate = useCallback(
    (formDate: NickNameForm) => {
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

  const getRating = useCallback((point: number) => {
    let rating = "브론즈";
    if (point >= 1000) {
      rating = "실버";
    }
    if (point >= 10000) {
      rating = "골드";
    }
    return rating;
  }, []);

  return (
    <>
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} autoClose className={popUpState.isSuccess ? "green" : "red"}>
          {popUpState.message}
        </Popup>
      )}
      <Wrapper>
        {user ? (
          <div>
            <ProfileImg>
              <div>
                {user.image ? (
                  <img src={`${process.env.BASE_URL}/image/${user.image}`} alt="myProfileImg" />
                ) : (
                  <img src={noProfileImg} alt="noProfileImg" />
                )}
              </div>
            </ProfileImg>
            <UserInfoMation>
              <div>
                <span>{`${getRating(user.point.totalPoint)}회원`}</span>
                <span>{`총 ${user.point.totalPoint}점`}</span>
                <div className="point">
                  <p>북파이 등급안내</p>
                  <div>
                    <span className="bronze">브론즈</span>
                    <span>포인트 0점~ 100점</span>
                  </div>
                  <div>
                    <span className="silver">실버</span>
                    <span>포인트 100점~ 1000점</span>
                  </div>
                  <div>
                    <span className="gold">골드</span>
                    <span>포인트 10000점 ~ </span>
                  </div>
                  <div>
                    <span>총 포인트</span>
                    <span>{`${user.point.totalPoint}점`}</span>
                  </div>
                  <div>
                    <span>사용한 포인트</span>
                    <span>{`${user.point.usedPoint}점`}</span>
                  </div>
                  <div>
                    <span>보유한 포인트</span>
                    <span>{`${user.point.holdPoint}점`}</span>
                  </div>
                </div>
              </div>
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
                    rules={options}
                    render={({ field }) => <CustomInput {...field} placeholder="닉네임 입력" />}
                  />

                  <Button color="mainDarkBrown" variant="contained" type="submit">
                    닉네임변경
                  </Button>
                </form>
              )}
              <ErrorMessage message={errors.nickName?.message} />
              <div>
                <span>회원가입일</span> <span>{user.createDate.split("T")[0].replaceAll("-", ".") ?? ""}</span>
              </div>
              <div>
                <span>남은 포인트</span>
                <span>{`${user.point.holdPoint}점`}</span>
              </div>
              <div>
                <Button color="mainDarkBrown" variant="contained">
                  포인트 충전
                </Button>
              </div>
            </UserInfoMation>
          </div>
        ) : (
          <div>
            <ProfileImg>
              <div>
                <Skeleton variant="circular" width={200} height={200} animation="wave" />
              </div>
            </ProfileImg>
            <UserInfoMation>
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
            </UserInfoMation>
          </div>
        )}
        <div />
      </Wrapper>
    </>
  );
};

export default MyTop;
