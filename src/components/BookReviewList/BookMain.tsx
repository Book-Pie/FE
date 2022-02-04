import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  bestSellerAsync,
  bookReduceSelector,
  mainEconomicList,
  mainMagazineList,
  mainNovelList,
} from "modules/Slices/book/bookSlice";
import { useTypedSelector } from "modules/store";
import HomeCategoryList from "./HomeCategoryList";
import { BestSellerWrapper, BookReviewMainTap, MainTitle, ReviewHomeListWrapper, ReviewListWrapper } from "./styles";

const BookMain = () => {
  const dispatch = useDispatch();
  const { bestSeller, novelList, magazineList, economicList } = useTypedSelector(bookReduceSelector);

  useEffect(() => {
    dispatch(bestSellerAsync());
    dispatch(mainNovelList());
    dispatch(mainMagazineList());
    dispatch(mainEconomicList());
  }, []);

  return (
    <ReviewListWrapper>
      <BookReviewMainTap>
        <NavLink to="/book/" activeClassName="reviewMainButton--Active">
          리뷰 홈
        </NavLink>
        <NavLink to="/book/category" className="category">
          카테고리
        </NavLink>
      </BookReviewMainTap>
      <ReviewHomeListWrapper>
        <BestSellerWrapper>
          <MainTitle>베스트셀러</MainTitle>
          <HomeCategoryList list={bestSeller} />
        </BestSellerWrapper>
        <BestSellerWrapper>
          <MainTitle>소설 추천</MainTitle>
          <HomeCategoryList list={novelList} />
        </BestSellerWrapper>
        <BestSellerWrapper>
          <MainTitle>인문학 추천</MainTitle>
          <HomeCategoryList list={economicList} />
        </BestSellerWrapper>
        <BestSellerWrapper>
          <MainTitle>잡지 리스트</MainTitle>
          <HomeCategoryList list={magazineList} />
        </BestSellerWrapper>
      </ReviewHomeListWrapper>
    </ReviewListWrapper>
  );
};

export default BookMain;
