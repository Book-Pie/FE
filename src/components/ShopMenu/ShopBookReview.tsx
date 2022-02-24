import { useAppDispatch, useTypedSelector } from "modules/store";
import queryString from "query-string";
import { useEffect } from "react";
import {
  userReviewsSelector,
  fetchReviewAsync,
  setReviewPage,
  setReivewsReset,
  userReduceSelector,
} from "modules/Slices/user/userSlice";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Loading from "elements/Loading";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MyReviewTable from "../MyReview/MyReviewTable";
import { MyReviewWrapper } from "../MyReview/style";
import { Title, TitleSpan } from "../UsedBookLikeList/styles";
import { Column, EmptyListWrapper } from "./styles";

const ShopBookReview = () => {
  const { empty, contents, page, pageCount, size, status } = useTypedSelector(userReviewsSelector);
  const loading = status === "loading";
  const { shop } = useTypedSelector(userReduceSelector);
  const dispatch = useAppDispatch();

  const makeQuery = (page: number, size: number) => {
    return queryString.stringify({
      page,
      size,
    });
  };

  const handlePaginationOnChange = (_: any, value: number) => {
    if (shop) {
      const currentPage = value - 1;
      if (contents && contents[currentPage]) {
        dispatch(setReviewPage(currentPage));
      } else {
        const query = makeQuery(currentPage, size);
        dispatch(fetchReviewAsync({ userId: shop.id, query }));
      }
    }
  };

  useEffect(() => {
    if (shop !== null && page === 0 && contents === null) {
      const query = makeQuery(page, size);
      dispatch(fetchReviewAsync({ userId: shop.id, query }));
    }
  }, [dispatch, shop, page, size, contents]);

  useEffect(() => {
    dispatch(setReivewsReset());
  }, []);

  if (contents) {
    return (
      <MyReviewWrapper>
        <Loading isLoading={loading} />
        <Title>
          <TitleSpan>최근 작성한 도서 리뷰</TitleSpan>
        </Title>
        {empty ? (
          <EmptyListWrapper>
            <Column>
              <LocalLibraryIcon sx={{ fontSize: "3rem", color: "#c9c9ca", marginBottom: "0.5rem" }} />
              <div>최근 작성한 도서 리뷰가 없습니다.</div>
            </Column>
          </EmptyListWrapper>
        ) : (
          <MyReviewTable contents={contents[page]} />
        )}
        {empty || (
          <Stack justifyContent="center" direction="row">
            <Pagination
              count={pageCount}
              page={page + 1}
              onChange={handlePaginationOnChange}
              variant="outlined"
              size="large"
              sx={{
                ".Mui-selected": {
                  background: theme => theme.colors.mainDarkBrown,
                  color: theme => theme.colors.white,
                },
              }}
            />
          </Stack>
        )}
      </MyReviewWrapper>
    );
  }
  return null;
};

export default ShopBookReview;
