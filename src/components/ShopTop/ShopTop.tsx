import { useCallback, useEffect } from "react";
import noProfileImg from "assets/image/pie3x.png";
import { dateArrayFormat } from "src/utils/formatUtil";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/modules/store";
import { useMediaQuery } from "@mui/material";
import { fetchShopUserInfoAsync, userReduceSelector } from "src/modules/Slices/user/userSlice";
import {
  checkStoreFollow,
  countCheckStoreFollow,
  usedBookDetailSelector,
} from "src/modules/Slices/usedBookDetail/usedBookDetailSlice";
import MyChart from "../MyTop/MyChart";
import { MyChartWrapper, EmptyChart, TitleSpan, NoneProfileImg, ShopProfileImg } from "../MyTop/style";
import {
  ImgWrapper,
  ShopTopProfileWrapper,
  ShopTopUserInfo,
  ShopTopUserInfoCenterWrapper,
  ShopTopUserInfoWrapper,
  ShopTopWrapper,
} from "./styles";
import { RatingContent } from "../BookDetail/style";
import { ShopTopParam } from "./types";
import UserFollowButton from "./UserFollowButton";

const ShopTop = ({ chart, shopId }: ShopTopParam) => {
  const dispatch = useDispatch();
  const { shop } = useTypedSelector(userReduceSelector);
  const { user, token, isLoggedIn } = useTypedSelector(userReduceSelector);
  const { follow, followCheck } = useTypedSelector(usedBookDetailSelector);
  const { followerCount, followingCount } = follow;
  const matches = useMediaQuery("(max-width:900px)");
  const getRating = useCallback((point: number) => {
    let rating = "브론즈";
    if (point >= 100000) {
      rating = "실버";
    }
    if (point >= 1000000) {
      rating = "골드";
    }
    return rating;
  }, []);

  useEffect(() => {
    dispatch(fetchShopUserInfoAsync(shopId));
  }, [dispatch, shopId]);

  useEffect(() => {
    if (isLoggedIn && shopId) {
      dispatch(countCheckStoreFollow(Number(shopId)));
    }
  }, [dispatch, isLoggedIn, shopId, followCheck]);

  useEffect(() => {
    if (shopId && token) {
      dispatch(
        checkStoreFollow({
          id: Number(shopId),
          token,
        }),
      );
    }
  }, [dispatch, shopId, token, followCheck]);

  return (
    <ShopTopWrapper>
      {shop && (
        <>
          {shop.image ? (
            <ShopTopProfileWrapper>
              <ShopProfileImg>
                <img src={`${process.env.BASE_URL}/image/${shop.image}`} alt="myProfileImg" />
                {shopId && (
                  <UserFollowButton
                    user={user}
                    shopId={shopId}
                    followCheck={followCheck}
                    followerCount={followerCount}
                    followingCount={followingCount}
                    type="shopTop"
                  />
                )}
              </ShopProfileImg>
            </ShopTopProfileWrapper>
          ) : (
            <ImgWrapper>
              <NoneProfileImg>
                <img src={noProfileImg} alt="myProfileImg" />
                {shopId && (
                  <UserFollowButton
                    user={user}
                    shopId={shopId}
                    followCheck={followCheck}
                    followerCount={followerCount}
                    followingCount={followingCount}
                    type="shopTop"
                  />
                )}
              </NoneProfileImg>
            </ImgWrapper>
          )}
          <ShopTopUserInfoCenterWrapper>
            <ShopTopUserInfoWrapper>
              <ShopTopUserInfo>
                <span>{`${getRating(shop.point.totalPoint)}회원`}</span>
                <div>
                  <span>{shop.nickName}</span>
                </div>
                <div>
                  <span>회원가입일</span> <span>{dateArrayFormat(shop.createDate)[0]}</span>
                </div>
                <RatingContent>
                  <Rating name="read-only" precision={0.5} value={shop.rating} size="small" readOnly />
                </RatingContent>
              </ShopTopUserInfo>
            </ShopTopUserInfoWrapper>
          </ShopTopUserInfoCenterWrapper>
          {!matches && (
            <MyChartWrapper>
              <TitleSpan>선호 장르</TitleSpan>
              {chart.length !== 0 && <MyChart data={chart} />}
              {chart.length === 0 && (
                <EmptyChart>
                  <div>
                    <p>선호장르 데이터가 없습니다.</p>
                  </div>
                </EmptyChart>
              )}
            </MyChartWrapper>
          )}
        </>
      )}
    </ShopTopWrapper>
  );
};

export default ShopTop;
