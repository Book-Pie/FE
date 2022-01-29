import { useAppDispatch, useTypedSelector } from "modules/store";
import queryString from "query-string";
import { useEffect } from "react";
import { reviewsSelector, reviewListAsync, signInSelector, setReviewPage } from "modules/Slices/signIn/signInSlice";
import { Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Loading from "src/elements/Loading";
import noComments from "assets/image/noComments.png";
import * as Styled from "./style";
import MyReviewTable from "./MyReviewTable";

const MyReview = () => {
  const { empty, contents, page, pageCount, size, status } = useTypedSelector(reviewsSelector);
  const loading = status === "loading";
  const { user } = useTypedSelector(signInSelector);
  const dispatch = useAppDispatch();

  const makeQuery = (userId: number, page: number, size: number) => {
    return queryString.stringify({
      userId,
      page,
      size,
    });
  };

  const handlePaginationOnChange = (_: any, value: number) => {
    if (user) {
      const currentPage = value - 1;
      if (contents && contents[currentPage]) {
        dispatch(setReviewPage(currentPage));
      } else {
        const query = makeQuery(user.id, currentPage, size);
        dispatch(reviewListAsync(query));
      }
    }
  };

  useEffect(() => {
    if (user === null || page !== 0 || contents !== null) return;
    const query = makeQuery(user.id, page, size);
    dispatch(reviewListAsync(query));
  }, [dispatch, user, page, size, contents]);

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
