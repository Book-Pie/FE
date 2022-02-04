import { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { searchAladinBooksAsync, searchAladinBookSelector } from "modules/Slices/search/searchSlice";
import { useAppDispatch, useTypedSelector } from "modules/store";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Grid, Typography } from "@mui/material";
import { range } from "lodash";
import noComments from "assets/image/noComments.png";
import * as Styled from "./style";
import SearchReviewCard from "./SearchReviewCard";

const SearchBookReview = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { pageCount, pages, status } = useTypedSelector(searchAladinBookSelector);
  const loading = status === "loading";
  const pageArray = loading ? range(0, 8) : pages;
  const query = useMemo(() => queryString.parse(search), [search]);

  useEffect(() => {
    const newQuery = queryString.stringify({ keyword: query.title, QueryType: "Title" });
    dispatch(
      searchAladinBooksAsync({
        query: newQuery,
        isReload: true,
      }),
    );
  }, [search, query, dispatch]);

  return (
    <Styled.SearchWrapper>
      <Typography variant="h5" mt={2} fontWeight="bold">
        알라딘 검색 결과
        {pageCount > 1 && (
          <>
            (총<span>{pageCount * 8}개</span>)
          </>
        )}
      </Typography>
      <Styled.SearchAddMore>
        {pageCount > 1 && <Link to={`/search/aladin?QueryType=Title&keyword=${query.title}`}>더보기</Link>}
      </Styled.SearchAddMore>
      <Grid container spacing={2}>
        {pageArray ? (
          pageArray.map((page, idx) => <SearchReviewCard key={idx} page={page} />)
        ) : (
          <Grid item xs={12}>
            <Styled.SearchEmpty>
              <img src={noComments} alt="noComments" />
              <p>죄송합니다. 알라딘 결과가 없습니다.</p>
            </Styled.SearchEmpty>
          </Grid>
        )}
      </Grid>
    </Styled.SearchWrapper>
  );
};

export default SearchBookReview;
