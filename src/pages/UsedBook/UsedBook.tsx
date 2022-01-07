import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Popup from "components/Popup/Popup";
import Categorys from "components/Categorys/Categorys";
import UsedBookCard from "src/components/UsedBookCard/UsedBookCard";
import Loading from "components/Loading/Loading";
import DropDown from "components/DropDown/DropDown";
import { getCategory, getUsedBooks } from "src/api/usedBook/usedBook";
import { errorHandler } from "src/api/http";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import queryString from "query-string";
import { Wrapper } from "src/components/UsedBookCard/style";
import { makeNewQueryString, removeQueryString } from "utils/queryStringUtil";
import { UsedBookState, ICategory, IUsedBook, UsedBooksResponse, CategorysResponse, RequestParam } from "./types";
import { UsedBookContainer, ContentsWrapper, DropDownWrapper } from "./style";

const initialState: UsedBookState = {
  pages: [],
  pageCount: 1,
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
  const { pages, pageCount } = usedBook;
  const { search, pathname } = location;

  const queryObj = useMemo(() => queryString.parse(search), [search]);

  console.log(queryString.exclude(search, ["sort"]));

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

  const hasMorePosts = useCallback(async (param: RequestParam) => {
    try {
      const { nextPage, query = {} } = param;
      const { data } = await getUsedBooks<UsedBooksResponse>(nextPage, query);
      const { pageCount, pages } = data.data;

      // 응답으로 넘어온 배열을 [[],[],[],[]] 이차원배열로 만들어준다.
      const array = makeTwoDimensionalArray(pages);

      setUsedBook(prev => ({
        ...prev,
        pageCount,
        pages: prev.pages.length === 0 ? [...array] : [...prev.pages, ...array],
      }));
    } catch (error) {
      const message = errorHandler(error);
      setIsOpen(true);
      setMessage(message);
    }
  }, []);

  // ============================================ useEffect ============================================
  useEffect(() => {
    getCategory<CategorysResponse>().then(({ data }) => setCategorys(data.data));
  }, []);

  // 카테고리가 없을때 요청
  useEffect(() => {
    const propertyLength = Object.keys(queryObj).length;

    // 카테고리 선택 시
    if (propertyLength !== 0) {
      setUsedBook(initialState);
      setCurrentPage(1);
      hasMorePosts({ nextPage: 1, query: queryObj });
      return;
    }

    // 첫 컴포넌트 마운트 됬을때
    hasMorePosts({ nextPage: 1 });
  }, [hasMorePosts, queryObj]);

  useEffect(() => {
    if (currentPage !== 1)
      hasMorePosts({
        nextPage: currentPage,
      });
  }, [currentPage, hasMorePosts]);
  // ============================================ useEffect ============================================

  const UsedBookCards =
    pages.length !== 0 ? (
      pages.map((row, rowIndex) => {
        let ref = null;
        if (rowIndex === pages.length - 2) ref = handleObserver;
        return (
          <div key={rowIndex} className="contentsWrapper__row" ref={ref}>
            {row.map((col, colIndex) => {
              return Object.keys(col).length !== 0 ? (
                <UsedBookCard key={colIndex} page={col} />
              ) : (
                <Wrapper key={colIndex} />
              );
            })}
          </div>
        );
      })
    ) : (
      <div className="contentsWrapper__row--empty">등록된 글이 없습니다.</div>
    );

  const popup = (
    <Popup isOpen={isOpen} setIsOpen={setIsOpen} className="red" autoClose>
      {message}
    </Popup>
  );

  return (
    <UsedBookContainer>
      {isOpen && popup}
      <Loading isVisible={isLoading} />
      <h2 className="usedBook__title">중고 장터 메인</h2>
      <Categorys categorys={categorys} />
      <DropDownWrapper>
        <DropDown setSelectedId={setCurrentDropDownValue} defaultValue={currentDropDownValue}>
          <li>
            <Link to={removeQueryString(pathname, search, ["sort"])}>초기화</Link>
          </li>
          <li>
            <Link
              id="date"
              to={makeNewQueryString(pathname, queryObj, { sort: "date" })}
              className={currentDropDownValue === "date" ? "dropDown__list--selected" : ""}
            >
              최신순
            </Link>
          </li>
          <li>
            <Link
              id="view"
              to={makeNewQueryString(pathname, queryObj, { sort: "view" })}
              className={currentDropDownValue === "view" ? "dropDown__list--selected" : ""}
            >
              조회순
            </Link>
          </li>
        </DropDown>
      </DropDownWrapper>
      <ContentsWrapper>{UsedBookCards}</ContentsWrapper>
    </UsedBookContainer>
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
