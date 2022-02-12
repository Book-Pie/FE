import { memo, useMemo } from "react";
import { Skeleton, useMediaQuery } from "@mui/material";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Wrapper, CategoryWrapper, SmallCategoryWrapper, CategorySwiperWrapper } from "./styles";
import Category from "./Category";
import { CategorysProps } from "./types";

const ReviewCategorys = ({ categorys }: CategorysProps) => {
  const matches = useMediaQuery("(max-width:1200px)");
  const categoryNumber = 6;

  const swiperStyle = useMemo(
    () => ({
      width: "1200px",
      height: "75px",
    }),
    [],
  );

  return (
    <CategoryWrapper>
      {categorys.length === 0 ? (
        <Wrapper>
          {Array.from(new Array(categoryNumber)).map((_, idx) => {
            return (
              <Skeleton
                key={idx}
                width="150px"
                height="56px"
                sx={{ marginRight: "50px", marginTop: "10px" }}
                animation="wave"
                variant="rectangular"
              />
            );
          })}
        </Wrapper>
      ) : matches ? (
        <Wrapper>
          <SmallCategoryWrapper>
            {categorys.map((item, idx) => (
              <Category item={item} key={idx} />
            ))}
          </SmallCategoryWrapper>
        </Wrapper>
      ) : (
        <Wrapper>
          <CategorySwiperWrapper>
            <Swiper
              slidesPerView={6}
              slidesPerGroup={6}
              speed={1000}
              style={swiperStyle}
              navigation
              allowTouchMove={false}
              modules={[Navigation]}
              loop
            >
              {categorys.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <Category item={item} key={idx} />
                </SwiperSlide>
              ))}
            </Swiper>
          </CategorySwiperWrapper>
        </Wrapper>
      )}
    </CategoryWrapper>
  );
};

export default memo(ReviewCategorys);
