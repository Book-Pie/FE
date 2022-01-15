import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Popup from "src/elements/Popup";
import UsedBookCard from "src/components/UsedBookCard/UsedBookCard";
import DropDown from "src/elements/DropDown";
import { getCategory, getUsedBooks } from "src/api/usedBook/usedBook";
import { errorHandler } from "src/api/http";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString, removeQueryString } from "utils/queryStringUtil";
import noUsedBookCard from "assets/image/noComments.png";
import Loading from "src/elements/Loading";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import useDelay from "src/hooks/useDelay";
import Categorys from "src/components/Categorys/Categorys";
import useDebounce from "src/hooks/useDebounce";
import { UsedBookState, ICategory, IUsedBook, UsedBooksResponse, CategorysResponse, RequestParam } from "./types";
import {
  Wrapper,
  UsedBookCardWrapper,
  DropDownWrapper,
  UsedBookCardEmpty,
  UsedBookRow,
  Filter,
  MenuWrapper,
} from "./style";

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
  const throttlingRef = useRef<NodeJS.Timeout | null>();
  const debounce = useDebounce();
  const [currentDropDownValue, setCurrentDropDownValue] = useState("전체");
  const { pages, pageCount, isEmpty } = usedBook;
  const { search, pathname } = location;

  const history = useHistory();
  const delay = useDelay(600);

  const query = useMemo(() => queryString.parse(search), [search]);

  // 무한스크롤
  const handleObserver = (node: HTMLDivElement) => {
    if (node === null) return;
    // 기존에 생성했던 인스턴스가 있다면 기존에 감시하던 타겟을 감시를 정지한다.
    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const { target } = entry;
      if (pageCount !== currentPage && isLoading === false) {
        if (entry.isIntersecting) {
          if (throttlingRef.current) return;
          setIsLoading(true);
          throttlingRef.current = setTimeout(() => {
            setCurrentPage(currentPage + 1);
            throttlingRef.current = null;
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

  const handleGetMoreUsedBooks = useCallback(
    async (param: RequestParam) => {
      try {
        const { nextPage, query = {} } = param;
        const { data } = await getUsedBooks<UsedBooksResponse>(nextPage, query);
        const { pageCount, pages } = data.data;

        // 응답으로 넘어온 배열을 [[],[],[],[]] 이차원배열로 만들어준다.
        const array = makeTwoDimensionalArray(pages);

        await delay();
        setUsedBook(prev => ({
          ...prev,
          pageCount,
          pages: array,
          isEmpty: array.length === 0,
        }));
      } catch (error) {
        const message = errorHandler(error);
        setIsOpen(true);
        setMessage(message);
      } finally {
        setIsLoading(false);
      }
    },
    [delay],
  );

  const handleLoadCategory = useCallback(async () => {
    const { data } = await getCategory<CategorysResponse>();
    setCategorys(data.data);
  }, []);

  const handleTitleOnChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      if (value) {
        history.replace(makeNewQueryString(pathname, query, { title: value }));
        return;
      }
      history.replace(removeQueryString(pathname, search, ["title"]));
    }, 500);
    return 1;
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
  }, [handleLoadCategory]);

  useEffect(() => {
    setIsLoading(true);
    if (Object.keys(query).length === 0) {
      // 첫 컴포넌트 마운트 됬을때
      handleGetMoreUsedBooks({ nextPage: 1 });
    }

    if (Object.keys(query).length !== 0) {
      // 카테고리 및 정렬 선택 시
      setUsedBook(initialState);
      setCurrentPage(1);
      handleGetMoreUsedBooks({ nextPage: 1, query });
    }
  }, [handleGetMoreUsedBooks, query]);

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
      <Filter>
        {Object.entries(query).map(([key, value], idx) => (
          <Link key={idx} to={removeQueryString(pathname, search, [key])}>
            <span key={idx}>
              {value === "date" || value === "view" ? (value === "view" ? "조회순" : "최신순") : value}
            </span>
          </Link>
        ))}
      </Filter>
      <Categorys categorys={categorys} defaultLocation="usedBook" />
      <MenuWrapper>
        <div>
          <p>중고장터</p>
        </div>
        <div>
          <TextField
            fullWidth
            onChange={handleTitleOnChange}
            type="text"
            color="mainDarkBrown"
            placeholder="중고도서 제목을 입력해주세요."
          />
        </div>
        <DropDownWrapper>
          <DropDown defaultValue={currentDropDownValue} setSelectedId={setCurrentDropDownValue}>
            <li>
              <Link to={removeQueryString(pathname, search, ["sort"])}>전체</Link>
            </li>
            <li>
              <Link id="date" to={makeNewQueryString(pathname, query, { sort: "date" })}>
                최신순
              </Link>
            </li>
            <li>
              <Link id="view" to={makeNewQueryString(pathname, query, { sort: "view" })}>
                조회순
              </Link>
            </li>
          </DropDown>
        </DropDownWrapper>
      </MenuWrapper>
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
