import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ReviewItem } from "./ReviewItem";
import { ReviewListEmpty } from "./ReviewListEmpty";
import { CommentUl, ReviewsListTitle, ReviewsListWrapper } from "./style";
import { ReviewListProps } from "./types";

export const ReviewList = ({ commentList, page, pageCount, totalCount, onChange }: ReviewListProps) => {
  return (
    <ReviewsListWrapper>
      <ReviewsListTitle>회원 리뷰 ({totalCount}건)</ReviewsListTitle>
      {commentList.length ? (
        <CommentUl>
          {commentList.map(review => {
            return <ReviewItem key={review.reviewId} content={review} />;
          })}
        </CommentUl>
      ) : (
        <ReviewListEmpty title="리뷰" />
      )}
      <Stack mt={5} justifyContent="center" direction="row">
        <Pagination
          count={pageCount}
          page={page}
          onChange={onChange}
          variant="outlined"
          shape="rounded"
          size="large"
          sx={{
            ".Mui-selected": {
              background: theme => theme.colors.mainDarkBrown,
              color: theme => theme.colors.white,
            },
          }}
        />
      </Stack>
    </ReviewsListWrapper>
  );
};
