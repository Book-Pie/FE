import pie3x from "assets/image/pie3x.png";
import Button from "@mui/material/Button";
import { useState, useCallback, useMemo, useEffect } from "react";
import { fetchUserInfoAsync, fetchNickNameUpdateAsync, userReduceSelector } from "modules/Slices/user/userSlice";
import { useForm, Controller, RegisterOptions } from "react-hook-form";
import { hookFormSpecialChractersCheck, makeOption, FormErrorMessages } from "utils/hookFormUtil";
import ErrorMessage from "elements/ErrorMessage";
import { Input, useMediaQuery } from "@mui/material";
import Popup from "elements/Popup";
import { dateArrayFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { Link } from "react-router-dom";
import usePopup from "hooks/usePopup";
import { getMyPageChart, userReviewSelector } from "src/modules/Slices/userReview/userReviewSlice";
import { countCheckStoreFollow, usedBookDetailSelector } from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import * as Styled from "./style";
import * as Types from "./types";
import PointInfo from "./PointInfo";
import Skeletons from "./Skeletons";
import MyChart from "./MyChart";
import { BottomArea, FollowTitle } from "../UsedBookDetail/style";

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
  const { myPageChart } = useTypedSelector(userReviewSelector);
  const { follow } = useTypedSelector(usedBookDetailSelector);
  const { followerCount, followingCount } = follow;
  const matches = useMediaQuery("(max-width:900px)");

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
      if (token) dispatch(fetchUserInfoAsync(token));
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
        const message = await dispatch(fetchNickNameUpdateAsync({ nickName, token })).unwrap();
        setIsNickNameUpdateOpen(false);
        handlePopupMessage(true, message);
      } catch (error: any) {
        handlePopupMessage(false, error);
      }
    },
    [token, dispatch, handlePopupMessage],
  );

  useEffect(() => {
    if (user) {
      const { id } = user;
      dispatch(getMyPageChart(String(id)));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(countCheckStoreFollow(user.id));
    }
  }, [dispatch, user]);

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
              <img
                src={user.image ? `${process.env.BASE_URL}/image/${user.image}` : pie3x}
                className={user.image ? "" : "noProfile"}
                alt="myProfileImg"
              />
              <BottomArea>
                <FollowTitle>팔로잉 {followingCount}</FollowTitle>
                <FollowTitle>팔로워 {followerCount}</FollowTitle>
              </BottomArea>
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
                <Link to="/my/point">
                  <Button color="info" variant="contained">
                    충전 내역 확인
                  </Button>
                </Link>
              </div>
              <div>
                <Link to="/my/chat">
                  <Button color="darkgray" variant="contained">
                    채팅 내역 확인
                  </Button>
                </Link>
              </div>
            </Styled.MyTopUserInfo>
          </div>
        ) : (
          <Skeletons />
        )}
        <Styled.MyChartWrapper>
          {!matches && <Styled.TitleSpan>선호 장르</Styled.TitleSpan>}
          {myPageChart.length !== 0 ? (
            <MyChart data={myPageChart} />
          ) : (
            <Styled.EmptyChart>
              <div>
                <p>선호장르 데이터가 없습니다.</p>
                <p>첫 리뷰를 작성해주세요!</p>
              </div>
            </Styled.EmptyChart>
          )}
        </Styled.MyChartWrapper>
      </Styled.MyTopWrapper>
    </>
  );
};

export default MyTop;
