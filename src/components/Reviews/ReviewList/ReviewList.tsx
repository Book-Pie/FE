import React, { useEffect } from "react";
import { ReviewItem } from "./ReviewItem";
import { ReviewListEmpty } from "./ReviewListEmpty";
import { CommentUl } from "./style";
import { ReviewListProps } from "./types";
import { useTypedSelector } from "../../../modules/store";
import { useDispatch } from "react-redux";
import { reviewCommentList, comments } from "../../../modules/Slices/commentSlice";
import { myId } from "../../../modules/Slices/signInSlice";

export const ReviewList: React.FC<ReviewListProps> = props => {
  const commentList = useTypedSelector(comments);
  // const myComment = useTypedSelector(myId); // 나의 아이디 정보
  const myComment = 5; // 나의 아이디 임시 데이터

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewCommentList());
    console.log(dispatch(reviewCommentList()));
    console.log("comments 통신 성공!");
    console.log(commentList);
  }, [dispatch]);

  console.log("ReviewList 데이터입니다. : ", commentList);

  return (
    <div className="ReviewsList_Wrapper">
      <h4>회원 리뷰 ({commentList.length}건)</h4>

      {commentList.length ? (
        <CommentUl>
          {commentList.map(review => {
            return <ReviewItem key={review.id} content={review} myComment={myComment} />;
          })}
        </CommentUl>
      ) : (
        <ReviewListEmpty />
      )}
    </div>
  );
};
