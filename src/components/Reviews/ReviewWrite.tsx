import React from "react";
import styled from "styled-components";
import { ReviewForm } from "./ReviewForm/ReviewForm";
import { Container } from "./ReviewList/style";
import { ReviewsWriteProps } from "./ReviewList/types";

export const ReviewWrite: React.FC<ReviewsWriteProps> = ({ bookId, myReviewId }) => {
  return (
    <Container>
      <Review>
        <ReviewForm bookId={bookId} reviewId={myReviewId} />
      </Review>
    </Container>
  );
};
const Review = styled.div``;

export default ReviewWrite;
