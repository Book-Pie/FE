import React from "react";
import styled from "styled-components";
import { ReviewForm } from "./ReviewForm/ReviewForm";
import { Container } from "./ReviewList/style";
import { ReviewsWriteProps } from "./ReviewList/types";

export const ReviewWrite: React.FC<ReviewsWriteProps> = ({ bookId, myReviewCheck, myReviewContent, myCommentId }) => {
  return (
    <Container>
      <Review>
        <ReviewForm
          userId={myCommentId}
          isbn={bookId}
          // isMyReview={myReviewCheck}
          // myReviewContent={myReviewContent}
        />
      </Review>
    </Container>
  );
};
const Review = styled.div``;

export default ReviewWrite;
