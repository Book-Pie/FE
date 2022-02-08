import { ReviewForm } from "./ReviewForm/ReviewForm";
import { Container } from "./ReviewList/style";
import { ReviewsWriteProps } from "./ReviewList/types";

export const ReviewWrite = ({ bookId, myReviewCheck, myComment, categoryName, checkAuth }: ReviewsWriteProps) => {
  return (
    <Container>
      <ReviewForm
        isbn={bookId}
        isMyReview={myReviewCheck}
        myComment={myComment}
        categoryName={categoryName}
        checkAuth={checkAuth}
      />
    </Container>
  );
};

export default ReviewWrite;
