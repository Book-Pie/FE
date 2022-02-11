import { useCallback } from "react";
import noProfileImg from "assets/image/noProfile.jpg";
import { dateArrayFormat } from "src/utils/formatUtil";
import { UserInfo } from "src/modules/Slices/user/types";
import Rating from "@mui/material/Rating";
import { GetChartResponse } from "src/modules/Slices/userReview/types";
import MyChart from "../MyTop/MyChart";
import { MyChartWrapper, ProfileImg, EmptyChart, TitleSpan } from "../MyTop/style";
import { ShopTopUserInfo, ShopTopWrapper } from "./styles";
import { RatingContent } from "../BookDetail/style";

export interface ShopTopParam {
  shop: UserInfo;
  chart: GetChartResponse[];
}

const ShopTop = ({ shop, chart }: ShopTopParam) => {
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

  return (
    <ShopTopWrapper>
      {shop && (
        <>
          <ProfileImg>
            <img src={shop.image ? `${process.env.BASE_URL}/image/${shop.image}` : noProfileImg} alt="myProfileImg" />
          </ProfileImg>
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
          <MyChartWrapper>
            <TitleSpan>선호 장르</TitleSpan>
            {chart.length !== 0 ? (
              <MyChart data={chart} />
            ) : (
              <EmptyChart>
                <div>
                  <p>선호장르 데이터가 없습니다.</p>
                </div>
              </EmptyChart>
            )}
          </MyChartWrapper>
        </>
      )}
    </ShopTopWrapper>
  );
};

export default ShopTop;
