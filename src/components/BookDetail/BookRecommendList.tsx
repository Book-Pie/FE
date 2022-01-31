import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { bookReduceSelector, getBookRecommendList } from "src/modules/Slices/book/bookSlice";
import { useTypedSelector } from "src/modules/store";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  NormalTitle,
  RelatedUsedBookBoldTitle,
  RelatedUsedBookItemContentWrapper,
  UsedBookThumbnail,
  RelatedUsedBookSwiper,
  RelatedReviewWrapper,
} from "../UsedBookDetail/style";

export interface BookRecommendListParam {
  isbn: string;
}

const BookRecommendList = ({ isbn }: BookRecommendListParam) => {
  const dispatch = useDispatch();
  const { bookRecommendList } = useTypedSelector(bookReduceSelector);

  useEffect(() => {
    dispatch(getBookRecommendList({ isbn }));
  }, []);

  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "50px",
      width: "1200px",
      height: "500px",
    }),
    [],
  );
  const list =
    bookRecommendList.length !== 0 &&
    bookRecommendList.map((item, idx) => {
      const { bookImageURL, bookname, isbn13 } = item.book;
      return (
        <SwiperSlide key={idx}>
          <Link to={`${isbn13}`}>
            <UsedBookThumbnail src={bookImageURL} alt={`image${idx}`} />
            <RelatedUsedBookItemContentWrapper>
              <RelatedUsedBookBoldTitle>{bookname}</RelatedUsedBookBoldTitle>
            </RelatedUsedBookItemContentWrapper>
          </Link>
        </SwiperSlide>
      );
    });

  return (
    <div>
      {bookRecommendList.length !== 0 && (
        <RelatedReviewWrapper>
          <NormalTitle>추천 도서</NormalTitle>
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

export default BookRecommendList;
