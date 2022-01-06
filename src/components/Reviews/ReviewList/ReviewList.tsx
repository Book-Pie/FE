import React from "react";
import { ReviewItem } from "./ReviewItem";
import { ReviewListEmpty } from "./ReviewListEmpty";
import { CommentUl } from "./style";
import { ReviewListProps } from "./types";
import { getCommentProps } from "../../../modules/Slices/commentSlice";

export const ReviewList: React.FC<ReviewListProps> = ({ bookId, commentList, myCommentId }) => {
  return (
    <div className="ReviewsList_Wrapper">
      <h4>회원 리뷰 ({commentList.length}건)</h4>
      {commentList.length ? (
        <CommentUl>
          {commentList.map((review: getCommentProps) => {
            return <ReviewItem key={review.id} content={review} myCommentId={myCommentId} />;
          })}
        </CommentUl>
      ) : (
        <ReviewListEmpty />
      )}
    </div>
  );
};
