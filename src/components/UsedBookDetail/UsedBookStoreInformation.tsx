import { Link, useHistory } from "react-router-dom";
import profileImg from "assets/image/pie3x.png";
import {
  addStoreFollow,
  checkStoreFollow,
  countCheckStoreFollow,
  deleteStoreFollow,
  usedBookDetailSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useTypedSelector } from "src/modules/store";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import { userReduceSelector } from "src/modules/Slices/user/userSlice";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import {
  CardBoldTitle,
  CardSmallTitle,
  ProductDetailCardFlexWrapper,
  ProductDetailCardWrapper,
  ProductDetailTitle,
  UsedBookStoreInformationWrapper,
  UsedStoreUserContentWrapper,
  WideCardSmallTitle,
  BottomArea,
  ProductDetailNoneProfileImg,
  ProductDetailProfileImg,
  UsedStoreFlexBox,
  UsedBookFollowButton,
} from "./style";

const UsedBookStoreInformation = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, token, isLoggedIn } = useTypedSelector(userReduceSelector);
  const { content, follow, followCheck } = useTypedSelector(usedBookDetailSelector);
  const { sellerName, sellerImage, favoriteCategories, totalSales } = content;
  const { sellerId } = content;
  const shopId = String(sellerId);
  const { followerCount, followingCount } = follow;

  const followAddSubmit = (e: any) => {
    if (!isLoggedIn) {
      if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
        history.replace("/signIn");
      }
      e.preventDefault();
      return false;
    }
    if (!token) throw alert("로그인이 필요합니다.");
    if (sellerId) {
      dispatch(
        addStoreFollow({
          data: {
            userId: sellerId,
          },
          token,
        }),
      );
    }
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
    if (sellerId) {
      dispatch(
        deleteStoreFollow({
          id: sellerId,
          token,
        }),
      );
    }
    e.preventDefault();
    return false;
  };

  useEffect(() => {
    if (isLoggedIn && sellerId) {
      dispatch(countCheckStoreFollow(sellerId));
    }
  }, [dispatch, isLoggedIn, sellerId, followCheck]);

  useEffect(() => {
    if (sellerId && token) {
      dispatch(
        checkStoreFollow({
          id: sellerId,
          token,
        }),
      );
    }
  }, [dispatch, sellerId, token, followCheck]);

  return (
    <UsedBookStoreInformationWrapper height="340px" width="100">
      <ProductDetailTitle>상점정보</ProductDetailTitle>
      <ProductDetailCardWrapper>
        <ProductDetailCardFlexWrapper>
          <Link to={`/shop/${shopId}`}>
            {sellerImage ? (
              <ProductDetailProfileImg>
                <img src={`${process.env.BASE_URL}/image/${sellerImage}`} alt="myProfileImg" />
              </ProductDetailProfileImg>
            ) : (
              <ProductDetailNoneProfileImg>
                <img src={profileImg} alt="NoneProfileImg" />
              </ProductDetailNoneProfileImg>
            )}
          </Link>
          {sellerName && totalSales && favoriteCategories && (
            <UsedStoreUserContentWrapper>
              <div>
                <WideCardSmallTitle>닉네임</WideCardSmallTitle>
                <WideCardSmallTitle>취향</WideCardSmallTitle>
              </div>
              <UsedStoreFlexBox>
                <div>
                  <CardBoldTitle>{sellerName}</CardBoldTitle>
                </div>
                <div>
                  {favoriteCategories &&
                    favoriteCategories
                      .filter((item, idx) => idx <= 2)
                      .map((item, idx) => (
                        <React.Fragment key={idx}>
                          <CardBoldTitle>
                            #{item.category}
                            <br />
                          </CardBoldTitle>
                        </React.Fragment>
                      ))}
                </div>
              </UsedStoreFlexBox>
              <BottomArea>
                <CardSmallTitle>상품 {totalSales}</CardSmallTitle>
                <CardSmallTitle>팔로잉 {followingCount}</CardSmallTitle>
                <CardSmallTitle>팔로워 {followerCount}</CardSmallTitle>
              </BottomArea>
            </UsedStoreUserContentWrapper>
          )}
        </ProductDetailCardFlexWrapper>
        <UsedBookFollowButton>
          {user?.id !== sellerId &&
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
        </UsedBookFollowButton>
      </ProductDetailCardWrapper>
    </UsedBookStoreInformationWrapper>
  );
};

export default UsedBookStoreInformation;
