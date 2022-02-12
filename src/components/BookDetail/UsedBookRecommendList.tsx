import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { bookReduceSelector, getRecommendUsedBookList } from "src/modules/Slices/book/bookSlice";
import { useTypedSelector } from "src/modules/store";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { NormalTitle, RelatedReviewWrapper, RelatedUsedBookSwiper } from "../UsedBookDetail/style";
import UsedBookCard from "../UsedBookList/UsedBookCard";
import { UsedBookRecommendListParam } from "./types";

const UsedBookRecommendList = ({ isbn }: UsedBookRecommendListParam) => {
  const dispatch = useDispatch();
  const { usedBookRecommendList } = useTypedSelector(bookReduceSelector);

  useEffect(() => {
    dispatch(getRecommendUsedBookList({ isbn }));
  }, [dispatch, isbn]);

  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "50px",
      width: "1200px",
      height: "500px",
    }),
    [],
  );

  const list =
    usedBookRecommendList.length !== 0 &&
    usedBookRecommendList.map((item, idx) => {
      return (
        <SwiperSlide key={idx}>
          <React.Fragment key={idx}>
            <UsedBookCard card={item} width={100} />
          </React.Fragment>
        </SwiperSlide>
      );
    });

  return (
    <div>
      {usedBookRecommendList.length !== 0 && (
        <RelatedReviewWrapper>
          <NormalTitle>연관 중고도서</NormalTitle>
          <RelatedUsedBookSwiper>
            <Swiper
              modules={[Navigation]}
              slidesPerView={5}
              style={swiperStyle}
              cssMode
              navigation
              pagination={{ clickable: true }}
            >
              {list}
            </Swiper>
          </RelatedUsedBookSwiper>
        </RelatedReviewWrapper>
      )}
    </div>
  );
};

export default UsedBookRecommendList;
