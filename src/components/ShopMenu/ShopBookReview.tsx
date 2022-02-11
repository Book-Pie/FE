import { useAppDispatch, useTypedSelector } from "modules/store";
import queryString from "query-string";
import { useEffect } from "react";
import { userReviewsSelector, fetchReviewAsync, setReviewPage, userSelector } from "modules/Slices/user/userSlice";
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Loading from "elements/Loading";
import noComments from "assets/image/noComments.png";
import MyReviewTable from "../MyReview/MyReviewTable";
import { MyReviewEmpty, MyReviewWrapper } from "../MyReview/style";
import { Title, TitleSpan } from "../UsedBookLikeList/styles";

const ShopBookReview = () => {
  const { empty, contents, page, pageCount, size, status } = useTypedSelector(userReviewsSelector);
  const loading = status === "loading";
  const shop = useTypedSelector(userSelector);
  const dispatch = useAppDispatch();

  const makeQuery = (userId: number, page: number, size: number) => {
    return queryString.stringify({
      userId,
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
        const query = makeQuery(shop.id, currentPage, size);
        dispatch(fetchReviewAsync(query));
      }
    }
  };

  useEffect(() => {
    if (shop === null || page !== 0 || contents !== null) return;
    const query = makeQuery(shop.id, page, size);
    dispatch(fetchReviewAsync(query));
  }, [dispatch, shop, page, size, contents]);

  if (contents) {
    return (
      <MyReviewWrapper>
        <Loading isLoading={loading} />
        <Title>
          <TitleSpan>최근 작성한 도서 리뷰</TitleSpan>
        </Title>
        {empty ? (
          <MyReviewEmpty>
            <img src={noComments} alt="noComments" />
            <p>작성한 리뷰가 없습니다.</p>
          </MyReviewEmpty>
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
