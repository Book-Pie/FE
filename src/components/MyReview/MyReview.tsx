import { useAppDispatch, useTypedSelector } from "modules/store";
import queryString from "query-string";
import { useCallback, useEffect } from "react";
import {
  userReviewsSelector,
  fetchReviewAsync,
  setReviewPage,
  userSelector,
  setReivewsReset,
} from "modules/Slices/user/userSlice";
import { Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Loading from "elements/Loading";
import noComments from "assets/image/noComments.png";
import * as Styled from "./style";
import MyReviewTable from "./MyReviewTable";

const MyReview = () => {
  const { empty, contents, page, pageCount, size, status } = useTypedSelector(userReviewsSelector);
  const loading = status === "loading";
  const user = useTypedSelector(userSelector);
  const dispatch = useAppDispatch();

  const makeQuery = (page: number, size: number) =>
    queryString.stringify({
      page,
      size,
    });

  const hasMoreMyReviews = useCallback(
    (page: number, size: number, userId: number) => {
      const query = makeQuery(page, size);
      dispatch(fetchReviewAsync({ userId, query }));
    },
    [dispatch],
  );

  const handlePaginationOnChange = (_: any, value: number) => {
    if (user === null) return;
    const currentPage = value - 1;
    if (contents && contents[currentPage]) {
      dispatch(setReviewPage(currentPage));
      return;
    }

    hasMoreMyReviews(currentPage, size, user.id);
  };

  useEffect(() => {
    if (user === null || page !== 0 || contents !== null) return;
    hasMoreMyReviews(page, size, user.id);
  }, [user, page, size, contents, hasMoreMyReviews]);

  useEffect(() => {
    dispatch(setReivewsReset());
  }, [dispatch]);

  if (contents) {
    return (
      <Styled.MyReviewWrapper>
        <Loading isLoading={loading} />
        <Typography variant="h4" mt={2} fontWeight="bold">
          최근 작성한 도서 리뷰
        </Typography>
        {empty ? (
          <Styled.MyReviewEmpty>
            <img src={noComments} alt="noComments" />
            <p>작성한 리뷰가 없습니다.</p>
          </Styled.MyReviewEmpty>
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
      </Styled.MyReviewWrapper>
    );
  }

  return null;
};

export default MyReview;
