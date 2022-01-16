import React from "react";
import { ReviewItem } from "./ReviewItem";
import { ReviewListEmpty } from "./ReviewListEmpty";
import { CommentUl, ReviewsListTitle, ReviewsListWrapper } from "./style";
import { ReviewListProps } from "./types";

export const ReviewList: React.FC<ReviewListProps> = ({ commentList, myCommentId }) => {
  return (
    <ReviewsListWrapper>
      <ReviewsListTitle>회원 리뷰 ({commentList.length}건)</ReviewsListTitle>
      {commentList.length ? (
        <CommentUl>
          {commentList.map(review => {
            return <ReviewItem key={review.reviewId} content={review} myCommentId={myCommentId} />;
          })}
        </CommentUl>
      ) : (
        <ReviewListEmpty />
      )}
    </ReviewsListWrapper>
  );
};
