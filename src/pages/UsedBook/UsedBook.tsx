import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Popup from "components/Popup/Popup";
import Categorys from "components/Categorys/Categorys";
import UsedBookCard from "src/components/UsedBookCard/UsedBookCard";
import DropDown from "components/DropDown/DropDown";
import { getCategory, getUsedBooks } from "src/api/usedBook/usedBook";
import { errorHandler } from "src/api/http";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString, removeQueryString } from "utils/queryStringUtil";
import noUsedBookCard from "assets/image/noComments.png";
import Text from "src/elements/Text";
import Loading from "src/elements/Loading";
import { Skeleton, Stack } from "@mui/material";
import { UsedBookState, ICategory, IUsedBook, UsedBooksResponse, CategorysResponse, RequestParam } from "./types";
import { Wrapper, UsedBookCardWrapper, DropDownWrapper, UsedBookCardEmpty, UsedBookRow } from "./style";

const initialState: UsedBookState = {
  pages: [],
  pageCount: 1,
  isEmpty: false,
};

const UsedBook = () => {
  const location = useLocation();
  const [usedBook, setUsedBook] = useState(initialState);
  const [categorys, setCategorys] = useState<ICategory>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const timerRef = useRef<NodeJS.Timeout | null>();
  const [currentDropDownValue, setCurrentDropDownValue] = useState("정렬");
  const { pages, pageCount, isEmpty } = usedBook;
  const { search, pathname } = location;
  const firstLoad = useRef(true);

  const currentQuery = useMemo(() => queryString.parse(search), [search]);

  // 무한스크롤
  const handleObserver = (node: HTMLDivElement) => {
    if (node === null) return;
    // 기존에 생성했던 인스턴스가 있다면 기존에 감시하던 타겟을 감시를 정지한다.
    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const { target } = entry;
      if (pageCount !== currentPage && isLoading === false) {
        if (entry.isIntersecting) {
          if (timerRef.current) return;
          setIsLoading(true);
          timerRef.current = setTimeout(() => {
            setCurrentPage(currentPage + 1);
            timerRef.current = null;
            setIsLoading(false);
          }, 500);
          observer.unobserve(target);
        }
      } else {
        observer.unobserve(target);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    });

    // 파라미터로 넘어온 요소를 감시하도록 등록한다.
    observerRef.current.observe(node);
  };

  const handleGetMoreUsedBooks = useCallback(async (param: RequestParam) => {
    try {
      const { nextPage, query = {} } = param;
      const { data } = await getUsedBooks<UsedBooksResponse>(nextPage, query);
      const { pageCount, pages } = data.data;

      // 응답으로 넘어온 배열을 [[],[],[],[]] 이차원배열로 만들어준다.
      const array = makeTwoDimensionalArray(pages);

      await new Promise(res => {
        setTimeout(res, 600);
      });

      setUsedBook(prev => ({
        ...prev,
        pageCount,
        pages: prev.pages.length === 0 ? [...array] : [...prev.pages, ...array],
        isEmpty: array.length === 0,
      }));
    } catch (error) {
      const message = errorHandler(error);
      setIsOpen(true);
      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadCategory = async () => {
    const { data } = await getCategory<CategorysResponse>();
    setCategorys(data.data);
  };

  const cards = pages.map((cards, idx) => (
    <UsedBookRow key={idx} ref={pages.length - 2 === idx ? handleObserver : undefined}>
      {cards.map((card, idx) => (
        <UsedBookCard key={idx} card={card} />
      ))}
    </UsedBookRow>
  ));

  const cardsSkeleton = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, idx) => (
        <UsedBookRow key={idx}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Stack spacing={0.5} key={idx} width="20%" sx={{ margin: "0.5rem" }}>
              <Skeleton variant="rectangular" width="100%" height={200} animation="wave" sx={{ borderRadius: "5px" }} />
              <Skeleton variant="text" width="100%" height={30} animation="wave" sx={{ borderRadius: "5px" }} />
              <Skeleton variant="text" width="100%" height={30} animation="wave" sx={{ borderRadius: "5px" }} />
            </Stack>
          ))}
        </UsedBookRow>
      )),
    [],
  );

  // ============================================ useEffect ============================================
  useEffect(() => {
    handleLoadCategory();
    firstLoad.current = false;
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(currentQuery).length === 0) {
      // 첫 컴포넌트 마운트 됬을때
      handleGetMoreUsedBooks({ nextPage: 1 });
    }

    if (Object.keys(currentQuery).length !== 0) {
      // 카테고리 및 정렬 선택 시
      setUsedBook(initialState);
      setCurrentPage(1);
      handleGetMoreUsedBooks({ nextPage: 1, query: currentQuery });
    }
  }, [handleGetMoreUsedBooks, currentQuery]);

  useEffect(() => {
    if (currentPage !== 1)
      handleGetMoreUsedBooks({
        nextPage: currentPage,
      });
  }, [currentPage, handleGetMoreUsedBooks]);
  // ============================================ useEffect ============================================

  return (
    <Wrapper>
      <Loading isLoading={isLoading} />
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className="red" autoClose>
          {message}
        </Popup>
      )}
      <Categorys categorys={categorys} defaultLocation="usedBook" />
      <DropDownWrapper>
        <Text bold fontSize="30px">
          중고장터
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
      </DropDownWrapper>
      <UsedBookCardWrapper>
        {isEmpty ? (
          <UsedBookCardEmpty>
            <span>등록된 글이 없습니다.</span>
            <span>게시글을 작성해주세요.</span>
            <span>
              <img src={noUsedBookCard} alt="noUsedBookCard" />
            </span>
          </UsedBookCardEmpty>
        ) : pages.length === 0 ? (
          cardsSkeleton
        ) : (
          cards
        )}
      </UsedBookCardWrapper>
    </Wrapper>
  );
};

const makeTwoDimensionalArray = (data: IUsedBook[]) => {
  const rowArray = Array.from({ length: Math.ceil(data.length / 5) }, (): IUsedBook[] => []);
  const totalCols = rowArray.length * 5;
  const colsArray = [];

  // 데이터가 18개가 들어오면 나머지 2개는 빈 객체로 채운다.
  for (let i = 0; i < totalCols; i += 1) {
    colsArray.push(data[i] ?? {});
  }

  let rowArrayIndex = -1;
  colsArray.forEach((col, idx) => {
    if (idx % 5 === 0) rowArrayIndex += 1;
    // col IUsedBook or {}
    rowArray[rowArrayIndex].push(col);
  });

  return rowArray;
};

export default UsedBook;
