import React, { useEffect } from "react";
import { ReviewList } from "components/Reviews/ReviewList/ReviewList";
import { ReviewWrite } from "components/Reviews/ReviewWrite";
import { myReviewComment, reviewCommentList, commentsSelector } from "src/modules/Slices/comment/commentSlice";
import { useTypedSelector } from "src/modules/store";
import { useDispatch } from "react-redux";
import { signInSelector } from "src/modules/Slices/signIn/signInSlice";
import { useHistory } from "react-router";
import { ReviewsParams } from "./types";
import { ReviewListEmpty } from "../ReviewList/ReviewListEmpty";

export const Reviews: React.FC<ReviewsParams> = ({ bookId }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signInStatus = useTypedSelector(signInSelector);
  const { user, isLoggedIn } = signInStatus;
  const { id } = user ?? -1;

  const reviewSelector = useTypedSelector(commentsSelector);
  const { myCommentCheck, content, myComment } = reviewSelector;

  useEffect(() => {
    dispatch(reviewCommentList({ bookId, id }));
    if (myCommentCheck === true) {
      dispatch(myReviewComment({ bookId, id }));
    }
  }, [bookId, id, dispatch, myCommentCheck]);

  return (
    <div className="Reviews">
      {/* 정렬 부분 */}
      {/* <ReviewListHeader bookId={bookId} />*/}
      {content.length ? <ReviewList commentList={content} myCommentId={id} /> : <ReviewListEmpty />}
      <ReviewWrite
        bookId={bookId}
        myReviewCheck={myCommentCheck}
        myComment={myComment}
        myCommentId={id}
        checkAuth={() => {
          if (isLoggedIn) {
            return true;
          }
          if (window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?")) {
            history.replace("/signIn");
          }
          return false;
        }}
      />
    </div>
  );
};
