import { searchAladinBooksAsync, searchAladinBookSelector } from "modules/Slices/search/searchSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { Typography, Grid } from "@mui/material";
import Loading from "elements/Loading";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import queryString from "query-string";
import { useLocation } from "react-router";
import noComments from "assets/image/noComments.png";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useScrollTop from "hooks/useScrollTop";
import AladinFilter from "./AladinFilter";
import SearchReviewCard from "./SearchReviewCard";
import * as Styled from "./style";

const Aladin = () => {
  const { status, pages, pageCount, page } = useTypedSelector(searchAladinBookSelector);
  const throttlingRef = useRef<NodeJS.Timeout | null>();
  const [visible, setVisible] = useState(false);
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  useScrollTop();
  const query = useMemo(() => queryString.parse(search), [search]);
  const loading = status === "loading";
  const observerRef = useRef<IntersectionObserver>();

  const handleSearchTop = () => {
    window.scrollTo(0, 0);
  };

  const makeQuery = useCallback(
    (query: queryString.ParsedQuery<string>, page: number) =>
      queryString.stringify({
        ...query,
        page,
      }),
    [],
  );

  const handleObserver = (node: HTMLDivElement) => {
    if (node === null) return;
    if (observerRef.current) observerRef.current.disconnect();

    const observerCallback = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      const { target } = entry;
      if (page !== pageCount) {
        if (entry.isIntersecting && status === "idle") {
          if (throttlingRef.current) return;
          throttlingRef.current = setTimeout(() => {
            dispatch(
              searchAladinBooksAsync({
                query: makeQuery(query, page + 1),
                isReload: false,
              }),
            );
            throttlingRef.current = null;
          }, 500);
        }
      } else {
        observer.unobserve(target);
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    });

    // 파라미터로 넘어온 요소를 감시하도록 등록한다.
    observerRef.current.observe(node);
  };

  useEffect(() => {
    if (pages !== null) return;

    dispatch(
      searchAladinBooksAsync({
        query: makeQuery(query, 1),
        isReload: true,
      }),
    );
  }, [query, pages, makeQuery, dispatch]);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 1500) {
        setVisible(true);
        return;
      }
      setVisible(false);
    };

    window.addEventListener("scroll", handleScrollEvent);
    return () => window.removeEventListener("scroll", handleScrollEvent);
  }, []);

  return (
    <Styled.SearchWrapper>
      <Loading isLoading={loading} />
      <Typography variant="h4" mt={2} fontWeight="bold">
        리뷰 검색결과
        {pageCount > 1 && (
          <>
            (총<span>{pageCount * 8}개</span>)
          </>
        )}
      </Typography>
      <AladinFilter />
      <Grid container spacing={2}>
        {pages ? (
          pages.map((page, idx) => <SearchReviewCard key={idx} page={page} />)
        ) : (
          <Grid item xs={12}>
            <Styled.SearchEmpty>
              <img src={noComments} alt="noComments" />
              <p>죄송합니다. 알라딘 결과가 없습니다.</p>
            </Styled.SearchEmpty>
          </Grid>
        )}
        <Grid item xs={12} ref={handleObserver} />
      </Grid>
      <Styled.SearchTopButtonWrapper isVisible={visible}>
        <button type="button" onClick={handleSearchTop}>
          <ArrowUpwardIcon />
        </button>
      </Styled.SearchTopButtonWrapper>
    </Styled.SearchWrapper>
  );
};

export default Aladin;
