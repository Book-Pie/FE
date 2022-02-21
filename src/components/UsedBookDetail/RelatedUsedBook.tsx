import { useTypedSelector } from "modules/store";
import { getRelatedUsedBookList, usedBookDetailSelector } from "modules/Slices/usedBookDetail/usedBookDetailSlice";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { compareDateFormat, make1000UnitsCommaFormet } from "utils/formatUtil";
import { Link, useRouteMatch } from "react-router-dom";
import { Navigation } from "swiper";
import {
  NormalTitle,
  RelatedProductSwiperWrapper,
  RelatedUsedBookBoldTitle,
  RelatedUsedBookHashTagItem,
  RelatedUsedBookItemContentWrapper,
  RelatedUsedBookWrapper,
  UsedBookThumbnail,
} from "./style";

const RelatedUsedBook = () => {
  const dispatch = useDispatch();
  const { relatedUsedBookList, content } = useTypedSelector(usedBookDetailSelector);
  const { usedBookId } = content;
  const { params } = useRouteMatch<{ id: string }>();
  const { id } = params;

  useEffect(() => {
    if (relatedUsedBookList.length === 0 && Object.keys(content).length !== 0) {
      if (content.fstCategory && content.tags) {
        dispatch(
          getRelatedUsedBookList({
            category: content.fstCategory,
            tags: content.tags,
          }),
        );
      }
    }
  }, [content, dispatch, relatedUsedBookList]);

  useEffect(() => {
    if (Number(id) === usedBookId && Object.keys(content).length !== 0) {
      if (content.fstCategory && content.tags) {
        dispatch(
          getRelatedUsedBookList({
            category: content.fstCategory,
            tags: content.tags,
          }),
        );
      }
    }
  }, [usedBookId]);

  const swiperStyle = useMemo(
    () => ({
      paddingBottom: "50px",
      width: "1200px",
      height: "500px",
    }),
    [],
  );

  const list = relatedUsedBookList.map((item, idx) => {
    const { id, image, price, title, uploadDate } = item;
    const date = compareDateFormat(String(uploadDate));
    let dayAgo = "일전";
    if (date === 0) {
      dayAgo = "오늘";
    }

    return (
      <SwiperSlide key={idx}>
        <Link to={`/usedBook/${id}`}>
          <UsedBookThumbnail src={`${process.env.BASE_URL}/image/${image}`} alt={`image${idx}`} />
          <RelatedUsedBookItemContentWrapper>
            <RelatedUsedBookBoldTitle>{title}</RelatedUsedBookBoldTitle>
            <RelatedUsedBookBoldTitle brown>{make1000UnitsCommaFormet(String(price))}원</RelatedUsedBookBoldTitle>
            <RelatedUsedBookHashTagItem>
              {date !== 0 ? (
                <span>
                  {date} {dayAgo}
                </span>
              ) : (
                <span>{dayAgo}</span>
              )}
            </RelatedUsedBookHashTagItem>
          </RelatedUsedBookItemContentWrapper>
        </Link>
      </SwiperSlide>
    );
  });

  return (
    <RelatedUsedBookWrapper>
      <NormalTitle>연관 상품</NormalTitle>
      <RelatedProductSwiperWrapper>
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
      </RelatedProductSwiperWrapper>
    </RelatedUsedBookWrapper>
  );
};

export default RelatedUsedBook;
