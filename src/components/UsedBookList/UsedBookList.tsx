import React, { ChangeEvent, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Popup from "elements/Popup";
import UsedBookCard from "components/UsedBookList/UsedBookCard";
import DropDown from "elements/DropDown";
import client, { errorHandler, createResource } from "api/client";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { makeNewQueryString, removeQueryString } from "utils/queryStringUtil";
import noUsedBookCard from "assets/image/noComments.png";
import Loading from "elements/Loading";
import TextField from "@mui/material/TextField";
import useDelay from "hooks/useDelay";
import useDebounce from "hooks/useDebounce";
import Chip from "@mui/material/Chip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button, Typography, useTheme } from "@mui/material";
import { useForm } from "react-hook-form";
import { FormErrorMessages, htmlTagPatternCheck } from "utils/hookFormUtil";
import ErrorMessage from "elements/ErrorMessage";
import { useTypedSelector } from "modules/store";
import { isLoggedInSelector } from "modules/Slices/user/userSlice";

import UsedBookCategory from "./UsedBookCategory";
import * as Types from "./types";
import * as Styled from "./style";
import Skeletons from "./Skeletons";
import UsedBookSkeleton from "./UsedBookSkeleton";

const initialState = {
  pages: [],
  pageCount: 1,
  isEmpty: false,
};
const categorysResource = createResource<Types.CategorysResponse>(
  client.get<Types.CategorysResponse>("/usedbook/category"),
);

const UsedBookList = () => {
  const location = useLocation();
  const [usedBook, setUsedBook] = useState<Types.UsedBookState>(initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver>();
  const throttlingRef = useRef<NodeJS.Timeout | null>();
  const debounce = useDebounce();
  const theme = useTheme();
  const [currentDropDownValue, setCurrentDropDownValue] = useState("전체");
  const { formState, setError, clearErrors } = useForm<{ title: string }>();
  const { pages, pageCount, isEmpty } = usedBook;
  const { search, pathname } = location;
  const isLoggedIn = useTypedSelector(isLoggedInSelector);

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
    (page: number) => {
      setIsLoading(true);
      const url = `/usedbook?${queryString.stringify({ ...query, page })}`;
      const promise = client.get<Types.UsedBookListResponse>(url);

      promise
        .then(async ({ data }) => {
          await delay();
          const { pageCount, pages } = data;
          setUsedBook(prev => ({
            ...prev,
            pageCount,
            pages: [...prev.pages, ...pages],
            isEmpty: pages.length === 0,
          }));
        })
        .catch(error => {
          const message = errorHandler(error);
          setIsOpen(true);
          setMessage(message);
        })
        .finally(() => setIsLoading(false));
    },
    [delay, query],
  );

  const handleTitleOnChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      if (value.length > 50) {
        setError("title", { type: "maxLength", message: FormErrorMessages.MAX_LENGTH });
        return;
      }
      if (htmlTagPatternCheck(value)) {
        setError("title", { type: "html", message: "HTML태그는 검색이 불가합니다." });
        return;
      }

      if (value) {
        history.replace(makeNewQueryString(pathname, query, { title: value }));
      } else {
        history.replace(removeQueryString(pathname, search, ["title"]));
      }
      clearErrors();
    }, 500);
    return 1;
  };

  // ============================================ useEffect ============================================

  useEffect(() => {
    setCurrentPage(1);
    setUsedBook(initialState);
    handleGetMoreUsedBooks(1);
  }, [query, handleGetMoreUsedBooks]);

  useEffect(() => {
    if (currentPage !== 1) handleGetMoreUsedBooks(currentPage);
  }, [currentPage]);

  // ============================================ useEffect ============================================
  const usedBookCards = pages.map((card, idx) => {
    if (pages.length - 5 === idx) {
      return (
        <React.Fragment key={idx}>
          <div ref={handleObserver} />
          <UsedBookCard card={card} />
        </React.Fragment>
      );
    }

    return <UsedBookCard key={idx} card={card} />;
  });

  return (
    <section>
      <Loading isLoading={isLoading} />
      {isOpen && (
        <Popup isOpen={isOpen} setIsOpen={setIsOpen} className="red" autoClose>
          {message}
        </Popup>
      )}
      <Styled.UsedBookFilter>
        <Typography variant="h5" fontWeight="bold" color={theme.colors.darkGrey}>
          도서 카테고리
        </Typography>
        {Object.entries(query).map(([key, value], idx) => (
          <Link key={idx} to={removeQueryString(pathname, search, [key])}>
            <Chip
              key={idx}
              color="info"
              variant="outlined"
              icon={<AddCircleIcon fontSize="small" />}
              label={value === "date" || value === "view" ? (value === "view" ? "조회순" : "최신순") : value}
            />
          </Link>
        ))}
      </Styled.UsedBookFilter>
      <Suspense fallback={<UsedBookSkeleton type="category" />}>
        <UsedBookCategory defaultLocation="usedBook" resource={categorysResource} />
      </Suspense>
      <Styled.UsedBookSearchWrapper>
        <Typography variant="h4" mt={3} mb={2} fontWeight="bold" color={theme.colors.darkGrey}>
          중고도서 검색
        </Typography>
        <TextField
          fullWidth
          onChange={handleTitleOnChange}
          type="text"
          color="mainDarkBrown"
          placeholder="중고도서 이름을 입력해주세요."
        />
        <ErrorMessage message={formState.errors.title?.message} />
      </Styled.UsedBookSearchWrapper>
      <Styled.UsedBookMenuWrapper>
        <div>
          <p>중고도서</p>
        </div>
        <div>
          {isLoggedIn && (
            <Link to="/my/sale/insert">
              <Button variant="contained" color="mainDarkBrown">
                게시글 작성하기
              </Button>
            </Link>
          )}
          <Styled.DropDownWrapper>
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
          </Styled.DropDownWrapper>
        </div>
      </Styled.UsedBookMenuWrapper>
      <Styled.UsedBookCardsWrapper>
        {isEmpty ? (
          <Styled.UsedBookCardEmpty>
            <span>등록된 글이 없습니다.</span>
            <span>글을 작성해주세요.</span>
            <span>
              <img src={noUsedBookCard} alt="noUsedBookCard" />
            </span>
          </Styled.UsedBookCardEmpty>
        ) : pages.length ? (
          usedBookCards
        ) : (
          <Skeletons />
        )}
      </Styled.UsedBookCardsWrapper>
    </section>
  );
};

export default UsedBookList;
