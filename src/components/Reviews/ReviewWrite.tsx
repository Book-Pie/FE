import React from "react";
import { ReviewForm } from "./ReviewForm/ReviewForm";
import { Container } from "./ReviewList/style";
import { ReviewsWriteProps } from "./ReviewList/types";

export const ReviewWrite: React.FC<ReviewsWriteProps> = ({
  bookId,
  myReviewCheck,
  myComment,
  myCommentId,
  checkAuth,
}) => {
  return (
    <Container>
      <ReviewForm
        userId={myCommentId}
        isbn={bookId}
        isMyReview={myReviewCheck}
        myComment={myComment}
        checkAuth={checkAuth}
      />
    </Container>
  );
};

export default ReviewWrite;
