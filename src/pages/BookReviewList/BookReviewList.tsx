import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BookReviewItem from "src/components/BookReviewList/BookReviewItem";
import DropDown from "src/elements/DropDown";
import { getBookSelector, getCategoryBook, getReviewBook } from "src/modules/Slices/book/bookSlice";
import { useTypedSelector } from "src/modules/store";
import { makeNewQueryString, removeQueryString } from "src/utils/queryStringUtil";
import Text from "src/elements/Text";
import queryString from "query-string";
import { BookItemProps } from "src/modules/Slices/book/types";
import Loading from "src/elements/Loading";
import { useDispatch } from "react-redux";
import { BookReviewListContainer } from "../Main/style";
import { ReviewListTitleWrapper } from "../UsedBook/style";
import { BookReviewContainer } from "./styles";
import ReviewListSkeleton from "./ReviewListSkeleton";

const BookReviewList = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { list } = useTypedSelector(getBookSelector);
  const { pages } = list;
  const { search, pathname } = location;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDropDownValue, setCurrentDropDownValue] = useState("정렬");
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const throttlingRef = useRef<NodeJS.Timeout | null>();
  const currentQuery = useMemo(() => queryString.parse(search), [search]);

  // 무한스크롤
  const handleObserver = (node: HTMLDivElement) => {
    if (node === null) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const { target, isIntersecting } = entry;
      if (isIntersecting) {
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
      const query = queryString.stringify({ page });
      dispatch(getReviewBook(query));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(getCategoryBook());
    handleHasMoreReviewList(1);
  }, []);

  useEffect(() => {
    if (currentPage !== 1) handleHasMoreReviewList(currentPage);
  }, [currentPage, handleHasMoreReviewList]);

  return (
    <>
      <Loading isLoading={isLoading} />
      {/* <Categorys categorys={categorys} defaultLocation="usedBook" /> */}
      <ReviewListTitleWrapper>
        <Text bold fontSize="30px" margin="0 0 0 20px">
          리뷰
        </Text>
        <DropDown defaultValue={currentDropDownValue} setSelectedId={setCurrentDropDownValue}>
          <li>
            <Link to={removeQueryString(pathname, search, ["sort"])}>정렬</Link>
          </li>
          <li>
            <Link id="date" to={makeNewQueryString(pathname, currentQuery, { sort: "date" })}>
              최신순
            </Link>
          </li>
          <li>
            <Link id="view" to={makeNewQueryString(pathname, currentQuery, { sort: "view" })}>
              조회순
            </Link>
          </li>
        </DropDown>
      </ReviewListTitleWrapper>
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
    </>
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
