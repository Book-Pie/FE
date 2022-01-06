import React, { useEffect } from "react";
import { ReviewList } from "components/Reviews/ReviewList/ReviewList";
import { ReviewWrite } from "components/Reviews/ReviewWrite";
import { ReviewsProps } from "./types";
import useSignIn from "hooks/useSignIn";
import { comments, myComment, myReviewComment, myCommentCheck, reviewCommentList } from "modules/Slices/commentSlice";
import { useTypedSelector } from "src/modules/store";

export const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  const myReviewContent = useTypedSelector(myComment);
  const myReviewCheck = useTypedSelector(myCommentCheck);
  const commentList = useTypedSelector(comments);
  // const myComment = useTypedSelector(myId); // 나의 아이디 정보
  const myUserId = 5; // 나의 아이디 임시 데이터

  const { signIn, dispatch } = useSignIn();

  useEffect(() => {
    dispatch(reviewCommentList());
    dispatch(myReviewComment(myUserId));
  }, [dispatch]);

  return (
    <div className="Reviews">
      {/* 정렬 부분 */}
      {/* <ReviewListHeader bookId={bookId} />*/}
      <ReviewList bookId={bookId} commentList={commentList} myCommentId={myUserId} />
      <ReviewWrite bookId={bookId} myReviewCheck={myReviewCheck} myReviewContent={myReviewContent} />
    </div>
  );
};
