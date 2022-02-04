import { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import { BookItemProps } from "src/modules/Slices/book/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import StarRating from "../Rating/StarRating";
import {
  BestsellerItemWrapper,
  BestSellerListWrapper,
  BestsellerThumbnail,
  ListTitle,
  MainSwiperWrapper,
  ThumbnailWrapper,
} from "./styles";

export interface HomeCategoryListParam {
  list: BookItemProps[];
}

const HomeCategoryList = ({ list }: HomeCategoryListParam) => {
  const swiperStyle = useMemo(
    () => ({
      height: "450px",
    }),
    [],
  );

  return (
    <div>
      {list.length !== 0 && (
        <BestSellerListWrapper>
          <MainSwiperWrapper>
            <Swiper
              slidesPerView={5}
              observer
              spaceBetween={13}
              style={swiperStyle}
              navigation
              modules={[Navigation]}
              breakpoints={{
                500: {
                  width: 480,
                  slidesPerView: 2,
                },
                1200: {
                  width: 1200,
                  slidesPerView: 5,
                },
              }}
            >
              {list.map((item, index) => {
                const { bestRank, cover, customerReviewRank, isbn13, title } = item;
                return (
                  <SwiperSlide key={index}>
                    <Link to={`/book/category/${isbn13}`}>
                      <BestsellerItemWrapper>
                        {bestRank && <div>{`0${bestRank}`}</div>}
                        <ThumbnailWrapper>
                          <BestsellerThumbnail src={cover} alt={title} />
                        </ThumbnailWrapper>
                        <ListTitle>{title}</ListTitle>
                        <StarRating ReviewRank={customerReviewRank / 2} />
                      </BestsellerItemWrapper>
                    </Link>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </MainSwiperWrapper>
        </BestSellerListWrapper>
      )}
    </div>
  );
};

export default memo(HomeCategoryList);
