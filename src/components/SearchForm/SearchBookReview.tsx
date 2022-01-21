import { useEffect } from "react";
import { useLocation } from "react-router";
import { searchAladinBookListAsync, searchAladinBookSelector } from "src/modules/Slices/search/searchSlice";
import { useAppDispatch, useTypedSelector } from "src/modules/store";
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

  useEffect(() => {
    const query = queryString.parse(search);
    dispatch(searchAladinBookListAsync(queryString.stringify({ keyword: query.title })));
  }, [search, dispatch]);

  return (
    <Styled.SearchContainer>
      <Typography variant="h5" mt={2} fontWeight="bold">
        알라딘 검색 결과
      </Typography>
      <Styled.SearchAddMore>{pageCount > 1 && <Link to={`/usedBook${search}`}>더보기</Link>}</Styled.SearchAddMore>
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
    </Styled.SearchContainer>
  );
};

export default SearchBookReview;
