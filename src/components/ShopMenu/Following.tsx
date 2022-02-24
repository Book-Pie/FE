import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import GroupsIcon from "@mui/icons-material/Groups";
import CheckIcon from "@mui/icons-material/Check";
import noProfileImg from "assets/image/pie3x.png";
import { useTypedSelector } from "src/modules/store";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {
  addMyPageFollowList,
  deleteMyPageFollowList,
  getMyFollowingUserList,
  usedBookDetailSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { Link, useHistory } from "react-router-dom";
import { compareDateFormat, make1000UnitsCommaFormet } from "src/utils/formatUtil";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CountWrapper } from "../UsedBookDetail/style";
import { Title, TitleSpan } from "../UsedBookLikeList/styles";
import {
  CardWrapper,
  Column,
  DateWrapper,
  FlexBox,
  FollowingListWrapper,
  FollowingMainUsedBookListGrid,
  FollowingMainUsedBookListWrapper,
  FollowingUsedBookListWrapper,
  EmptyListWrapper,
  ShopContentWrapper,
  UsedBookCardImgBox,
  UsedBookListEmptyWrapper,
} from "./styles";
import { UsedBookCardWrapper } from "../UsedBookList/style";
import { StateEnumType } from "./types";
import UserFollowButton from "../ShopTop/UserFollowButton";

const Following = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, token, isLoggedIn } = useTypedSelector(userReduceSelector);
  const { shop } = useTypedSelector(userReduceSelector);
  const { FollowingList } = useTypedSelector(usedBookDetailSelector);
  const max1000 = useMediaQuery("(max-width:1000px)");
  const max850 = useMediaQuery("(max-width:850px)");
  const max630 = useMediaQuery("(max-width:630px)");

  const STATE_ENUM: StateEnumType = {
    SALE: "판매 중",
    SOLD_OUT: "판매완료",
    TRADING: "거래 중",
  };

  useEffect(() => {
    if (shop) {
      dispatch(getMyFollowingUserList(shop.id));
    }
  }, [dispatch, shop]);

  return (
    <ShopContentWrapper>
      <Title>
        <TitleSpan>팔로잉</TitleSpan>
        <CountWrapper>{FollowingList.length}</CountWrapper>
      </Title>
      {FollowingList.length !== 0 && (
        <FollowingListWrapper>
          {FollowingList.map((item, idx) => {
            const { nickName, profile, usedBookList, userId, followCheck, followId } = item;

            const followAddSubmit = (e: any) => {
              if (!isLoggedIn) {
                if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                  history.replace("/signIn");
                }
                e.preventDefault();
                return false;
              }
              if (!token) throw alert("로그인이 필요합니다.");
              dispatch(
                addMyPageFollowList({
                  data: {
                    userId,
                  },
                  token,
                  type: "follow",
                }),
              );
              e.preventDefault();
              return false;
            };

            const followDeleteSubmit = (e: any) => {
              if (!isLoggedIn) {
                if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
                  history.replace("/signIn");
                }
                e.preventDefault();
                return false;
              }
              if (!token) throw alert("로그인이 필요합니다.");
              if (followId) {
                dispatch(
                  deleteMyPageFollowList({
                    id: userId,
                    token,
                    type: "follow",
                  }),
                );
              }
              e.preventDefault();
              return false;
            };

            return (
              <>
                {max630 && (
                  <div key={idx}>
                    <CardWrapper width={100}>
                      <Link to={`/shop/${userId}`}>
                        <UsedBookCardImgBox>
                          {profile === null && <img src={noProfileImg} alt="myProfileImg" />}
                          {profile !== null && (
                            <img src={`${process.env.BASE_URL}/image/${profile}`} alt="usedBookImg" />
                          )}
                        </UsedBookCardImgBox>
                      </Link>
                      <div className="usedBookCard__content">
                        <p className="usedBookCard__title">{nickName}</p>
                        <DateWrapper>
                          <span>상품수 {usedBookList.length}</span>
                        </DateWrapper>
                      </div>
                      <UserFollowButton
                        user={user}
                        shopId={String(userId)}
                        followCheck={followCheck}
                        followerCount={0}
                        followingCount={0}
                        type="follow"
                        margin={20}
                      />
                    </CardWrapper>
                  </div>
                )}
                {!max630 && (
                  <FlexBox key={idx}>
                    <>
                      <CardWrapper>
                        <Link to={`/shop/${userId}`}>
                          <UsedBookCardImgBox>
                            {profile === null && <img src={noProfileImg} alt="myProfileImg" />}
                            {profile !== null && (
                              <img src={`${process.env.BASE_URL}/image/${profile}`} alt="usedBookImg" />
                            )}
                          </UsedBookCardImgBox>
                        </Link>
                        <div className="usedBookCard__content">
                          <p className="usedBookCard__title">{nickName}</p>
                          <DateWrapper>
                            <span>상품수 {usedBookList.length}</span>
                          </DateWrapper>
                          <div className="usedBookCard__state">
                            {user?.id !== userId &&
                              (followCheck ? (
                                <form onSubmit={followDeleteSubmit}>
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    type="submit"
                                    startIcon={<CheckIcon color="primary" />}
                                    className="active"
                                  >
                                    팔로우
                                  </Button>
                                </form>
                              ) : (
                                <form onSubmit={followAddSubmit}>
                                  <Button variant="contained" color="darkgray" type="submit" startIcon={<AddIcon />}>
                                    팔로우
                                  </Button>
                                </form>
                              ))}
                          </div>
                        </div>
                      </CardWrapper>
                      {usedBookList.length !== 0 && (
                        <FollowingMainUsedBookListGrid>
                          {usedBookList
                            .filter((item, idx) => (max850 ? idx < 2 : max1000 ? idx < 3 : idx < 4))
                            .map((item, idx) => {
                              const { id, image, price, state, title, uploadDate } = item;
                              const date = compareDateFormat(String(uploadDate));
                              let dayAgo = "일전";
                              if (date === 0) {
                                dayAgo = "오늘";
                              }
                              return (
                                <div key={idx}>
                                  <FollowingMainUsedBookListWrapper>
                                    <Link to={`/usedBook/${id}`}>
                                      <FollowingUsedBookListWrapper>
                                        {image === null && <img src={noProfileImg} alt="myProfileImg" />}
                                        {image !== null && (
                                          <img src={`${process.env.BASE_URL}/image/${image}`} alt="usedBookImg" />
                                        )}
                                      </FollowingUsedBookListWrapper>
                                      <UsedBookCardWrapper width={100}>
                                        <div className="usedBookCard__content">
                                          <p className="usedBookCard__title">{title}</p>
                                          <div className="usedBookCard__price">
                                            <strong>판매가</strong>
                                            <span>:</span>
                                            <span> {make1000UnitsCommaFormet(`${price}`)}원</span>
                                          </div>
                                          <DateWrapper>
                                            {date !== 0 ? (
                                              <span>
                                                {date} {dayAgo}
                                              </span>
                                            ) : (
                                              <span>{dayAgo}</span>
                                            )}
                                          </DateWrapper>
                                          <p className={`${state === "SOLD_OUT" ? "red" : ""} usedBookCard__state`}>
                                            {STATE_ENUM[state]}
                                          </p>
                                        </div>
                                      </UsedBookCardWrapper>
                                    </Link>
                                  </FollowingMainUsedBookListWrapper>
                                </div>
                              );
                            })}
                        </FollowingMainUsedBookListGrid>
                      )}
                      {usedBookList.length === 0 && (
                        <UsedBookListEmptyWrapper>
                          <Column>
                            <LocalLibraryIcon sx={{ fontSize: "50px", color: "#c9c9ca" }} />
                            <div>등록된 상품이 없습니다.</div>
                          </Column>
                        </UsedBookListEmptyWrapper>
                      )}
                    </>
                  </FlexBox>
                )}
              </>
            );
          })}
        </FollowingListWrapper>
      )}
      {FollowingList.length === 0 && (
        <EmptyListWrapper>
          <Column>
            <GroupsIcon sx={{ fontSize: "100px", color: "#c9c9ca" }} />
            <div>아직 팔로잉한 인원이 없습니다.</div>
          </Column>
        </EmptyListWrapper>
      )}
    </ShopContentWrapper>
  );
};

export default Following;
