import { useCallback } from "react";
import noProfileImg from "assets/image/pie3x.png";
import { dateArrayFormat } from "src/utils/formatUtil";
import Rating from "@mui/material/Rating";
import MyChart from "../MyTop/MyChart";
import { MyChartWrapper, ProfileImg, EmptyChart, TitleSpan, NoneProfileImg } from "../MyTop/style";
import { ShopTopUserInfo, ShopTopWrapper } from "./styles";
import { RatingContent } from "../BookDetail/style";
import { ShopTopParam } from "./types";

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
      {shop.image ? (
        <ProfileImg>
          <img src={`${process.env.BASE_URL}/image/${shop.image}`} alt="myProfileImg" />
        </ProfileImg>
      ) : (
        <NoneProfileImg>
          <img src={noProfileImg} alt="myProfileImg" />
        </NoneProfileImg>
      )}
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
    </ShopTopWrapper>
  );
};

export default ShopTop;
