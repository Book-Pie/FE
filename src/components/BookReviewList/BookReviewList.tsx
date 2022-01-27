import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import BookReviewItem from "src/components/BookReviewList/BookReviewItem";
import { getBookSelector, getDefaultBookList, getReviewBook, setListInit } from "src/modules/Slices/book/bookSlice";
import { useTypedSelector } from "src/modules/store";
import queryString from "query-string";
import { BookItemProps, GetCategoryAsyncSuccess, ParentsCategoryData } from "src/modules/Slices/book/types";
import Loading from "src/elements/Loading";
import { useDispatch } from "react-redux";
import { getCategoryReview } from "src/api/usedBook/usedBook";
import ReviewCategorys from "src/components/BookReviewList/ReviewCategorys";
import { BookReviewContainer, BookReviewListContainer, ReviewListWrapper, Text, Wrapper } from "./styles";
import ReviewListSkeleton from "./ReviewListSkeleton";

const BookReviewList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { list } = useTypedSelector(getBookSelector);
  const { pages } = list;
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [categorys, setCategorys] = useState<ParentsCategoryData[]>([]);

  const observerRef = useRef<IntersectionObserver>();
  const throttlingRef = useRef<NodeJS.Timeout | null>();
  const { search } = location;

  const query = useMemo(() => queryString.parse(search), [search]);

  // 무한스크롤
  const handleObserver = (node: HTMLDivElement) => {
    if (node === null) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const { target, isIntersecting } = entry;
      if (isIntersecting) {
        if (throttlingRef.current) return;
        setIsLoading(true);
        throttlingRef.current = setTimeout(() => {
          setCurrentPage(currentPage + 1);
          throttlingRef.current = null;
          setIsLoading(false);
        }, 500);
        observer.unobserve(target);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    });

    observerRef.current.observe(node);
  };

  const handleHasMoreReviewList = useCallback(
    async (page: number) => {
      dispatch(getReviewBook(queryString.stringify({ ...query, page })));
    },
    [dispatch, query],
  );

  useEffect(() => {
    (async () => {
      const { data } = await getCategoryReview<GetCategoryAsyncSuccess>();
      setCategorys(data.data);
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(query).length) {
      setCurrentPage(1);
      dispatch(setListInit());
      handleHasMoreReviewList(1);
    }
  }, [query, handleHasMoreReviewList]);

  useEffect(() => {
    dispatch(getDefaultBookList(1));
  }, []);

  useEffect(() => {
    if (currentPage !== 1) {
      if (Object.keys(query).length) {
        handleHasMoreReviewList(currentPage);
      }
      dispatch(getDefaultBookList(currentPage));
    }
  }, [currentPage, dispatch, handleHasMoreReviewList]);

  return (
    <ReviewListWrapper>
      <Loading isLoading={isLoading} />
      <ReviewCategorys categorys={categorys} defaultLocation="book" />
      <Wrapper>
        <Text>중고도서리뷰</Text>
      </Wrapper>
      <BookReviewContainer>
        {pages.length !== 0 ? (
          pages.map((page, index) => (
            <BookReviewListContainer key={index} ref={pages.length - 1 === index ? handleObserver : undefined}>
              {page.map((card, index) => (
                <BookReviewItem key={index} card={card} />
              ))}
            </BookReviewListContainer>
          ))
        ) : (
          <ReviewListSkeleton />
        )}
      </BookReviewContainer>
    </ReviewListWrapper>
  );
};

export const makeTwoDimensionalArray = (data: BookItemProps[]) => {
  const rowArray = Array.from({ length: Math.ceil(data.length / 5) }, (): BookItemProps[] => []);
  const totalCols = rowArray.length * 4;
  const colsArray = [];

  for (let i = 0; i < totalCols; i += 1) {
    colsArray.push(data[i] ?? {});
  }

  let rowArrayIndex = -1;
  colsArray.forEach((col, idx) => {
    if (idx % 4 === 0) rowArrayIndex += 1;
    rowArray[rowArrayIndex].push(col);
  });

  return rowArray;
};

export default BookReviewList;
