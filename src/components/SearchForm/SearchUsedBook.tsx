import { useLocation } from "react-router";
import { useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "src/modules/store";
import { searchUsedBookListAsync, searchUsedBookSelector } from "src/modules/Slices/search/searchSlice";
import { range } from "lodash";
import noComments from "assets/image/noComments.png";
import * as Styled from "./style";
import SearchUsedBookCard from "./SearchUsedBookCard";

const SearchUsedBook = () => {
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const { pageCount, pages, status } = useTypedSelector(searchUsedBookSelector);
  const loading = status === "loading";
  const pageArray = loading ? range(0, 8) : pages;

  useEffect(() => {
    dispatch(searchUsedBookListAsync(search));
  }, [search, dispatch]);

  return (
    <Styled.SearchWrapper>
      <Typography variant="h5" mt={2} fontWeight="bold">
        중고도서 검색 결과
        {pageCount > 1 && (
          <>
            (총<span>{pageCount * 8}개</span>)
          </>
        )}
      </Typography>
      <Styled.SearchAddMore>{pageCount > 1 && <Link to={`/usedBook${search}`}>더보기</Link>}</Styled.SearchAddMore>
      <Grid container spacing={2}>
        {pageArray ? (
          pageArray.map((page, idx) => <SearchUsedBookCard key={idx} page={page} />)
        ) : (
          <Grid item xs={12}>
            <Styled.SearchEmpty>
              <img src={noComments} alt="noComments" />
              <p>죄송합니다. 중고도서 결과가 없습니다.</p>
            </Styled.SearchEmpty>
          </Grid>
        )}
      </Grid>
    </Styled.SearchWrapper>
  );
};

export default SearchUsedBook;
