import React, { useEffect } from "react";
import { ReviewList } from "../ReviewList/ReviewList";
import { ReviewWrite } from "../ReviewWrite";
import { ReviewsProps } from "./types";
import useSignIn from "hooks/useSignIn";
import {
  comments,
  myComment,
  myReviewComment,
  myCommentCheck,
  reviewCommentList,
} from "../../../modules/Slices/commentSlice";
import { useTypedSelector } from "src/modules/store";
import { useDispatch } from "react-redux";

export const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  const myReviewContent = useTypedSelector(myComment);
  const myReviewCheck = useTypedSelector(myCommentCheck);
  const commentList = useTypedSelector(comments);
  // const myComment = useTypedSelector(myId); // 나의 아이디 정보
  const myUserId = 5; // 나의 아이디 임시 데이터

  const { signIn } = useSignIn();

  console.log("나의 아이디 : ", signIn);

  console.log("Reviews myReviewContent 데이터!!! : ", myReviewContent);
  console.log("Reviews myReviewCheck 데이터!!! : ", myReviewCheck);
  console.log("Reviews commentList 데이터!!! : ", commentList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reviewCommentList());
    dispatch(myReviewComment(myUserId));
    console.log("comments 통신 성공! : ", commentList);
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
