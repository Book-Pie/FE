import React, { useEffect } from "react";
import { ReviewItem } from "./ReviewItem";
import { ReviewListEmpty } from "./ReviewListEmpty";
import { CommentUl } from "./style";
import { ReviewListProps } from "./types";
import { useTypedSelector } from "../../../modules/store";
import { useDispatch } from "react-redux";
import { reviewCommentList, comments } from "../../../modules/Slices/commentSlice";

export const ReviewList: React.FC<ReviewListProps> = props => {
  const commentList = useTypedSelector(comments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewCommentList());
    console.log(dispatch(reviewCommentList()));
    console.log("comments 통신 성공!");
    console.log(commentList);
  }, [dispatch]);

  return (
    <div className="ReviewsList_Wrapper">
      <h4>회원 리뷰 ({commentList.length}건)</h4>

      {commentList.length ? (
        <CommentUl>
          {commentList.map(review => {
            return <ReviewItem key={review.review_id} content={review} />;
          })}
        </CommentUl>
      ) : (
        <ReviewListEmpty />
      )}
    </div>
  );
};
