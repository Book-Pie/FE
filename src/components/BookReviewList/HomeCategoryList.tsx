import { useMemo } from "react";
import { Link } from "react-router-dom";
import { BookItemProps } from "modules/Slices/book/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StarRating from "../Rating/StarRating";
import {
  BestsellerItemWrapper,
  BestSellerListWrapper,
  BestsellerThumbnail,
  ListTitle,
  SwiperWrapper,
  ThumbnailWrapper,
} from "./styles";

export interface HomeCategoryListParam {
  list: BookItemProps[];
}

const HomeCategoryList = ({ list }: HomeCategoryListParam) => {
  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "50px",
      width: "1200px",
      height: "450px",
      margin: "21px 28px 0px 0px",
    }),
    [],
  );

  return (
    <div>
      {list && list.length !== 0 && (
        <BestSellerListWrapper>
          <SwiperWrapper>
            <Swiper
              spaceBetween={30}
              slidesPerView={5}
              observer
              observeParents
              style={swiperStyle}
              watchSlidesProgress
              cssMode
              navigation
              modules={[Navigation, Pagination]}
            >
              {list &&
                list.map((item, index) => {
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
          </SwiperWrapper>
        </BestSellerListWrapper>
      )}
    </div>
  );
};

export default HomeCategoryList;
