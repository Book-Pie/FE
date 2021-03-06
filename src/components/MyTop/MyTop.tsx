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
    const name = "????????? ???????????????";
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
        if (!token) throw new Error("???????????? ????????????.");
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
                <FollowTitle>????????? {followingCount}</FollowTitle>
                <FollowTitle>????????? {followerCount}</FollowTitle>
              </BottomArea>
            </Styled.ProfileImg>
            <Styled.MyTopUserInfo>
              <PointInfo />
              <div>
                <span>{user.nickName}</span>
                <Button color="mainDarkBrown" variant="contained" onClick={handleNickNameUpdateOpen}>
                  {isNickNameUpdateOpne ? "??????" : "???????????????"}
                </Button>
              </div>
              {isNickNameUpdateOpne && (
                <form onSubmit={handleSubmit(handleNicknameUpdate)}>
                  <Controller
                    name="nickName"
                    control={control}
                    rules={nickNameOptions}
                    render={({ field }) => <Input {...field} placeholder="????????? ??????" sx={{ width: "50%" }} />}
                  />

                  <Button color="mainDarkBrown" variant="contained" type="submit">
                    ????????????
                  </Button>
                </form>
              )}
              <ErrorMessage message={errors.nickName?.message} />
              <div>
                <span>???????????????</span> <span>{dateArrayFormat(user.createDate)[0]}</span>
              </div>
              <div>
                <span>?????? ?????????</span>
                <span>{`${make1000UnitsCommaFormet(String(user.point.holdPoint))}???`}</span>
              </div>
              <div>
                <Button color="mainDarkBrown" variant="contained" onClick={handlePaymentPopUpOnClick}>
                  ????????? ??????
                </Button>
              </div>
              <div>
                <Link to="/my/point">
                  <Button color="info" variant="contained">
                    ?????? ?????? ??????
                  </Button>
                </Link>
              </div>
              <div>
                <Link to="/my/chat">
                  <Button color="darkgray" variant="contained">
                    ?????? ?????? ??????
                  </Button>
                </Link>
              </div>
            </Styled.MyTopUserInfo>
          </div>
        ) : (
          <Skeletons />
        )}
        <Styled.MyChartWrapper>
          {!matches && <Styled.TitleSpan>?????? ??????</Styled.TitleSpan>}
          {myPageChart.length !== 0 ? (
            <MyChart data={myPageChart} />
          ) : (
            <Styled.EmptyChart>
              <div>
                <p>???????????? ???????????? ????????????.</p>
                <p>??? ????????? ??????????????????!</p>
              </div>
            </Styled.EmptyChart>
          )}
        </Styled.MyChartWrapper>
      </Styled.MyTopWrapper>
    </>
  );
};

export default MyTop;
