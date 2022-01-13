import React, { useEffect } from "react";
import { ReviewList } from "components/Reviews/ReviewList/ReviewList";
import { ReviewWrite } from "components/Reviews/ReviewWrite";
import useSignIn from "hooks/useSignIn";
import {
  comments,
  myComment,
  myReviewComment,
  myCommentCheck,
  reviewCommentList,
} from "src/modules/Slices/comment/commentSlice";
import { useTypedSelector } from "src/modules/store";
import Box from "@mui/material/Box";
import { Skeleton } from "@mui/material";
import { FlexColum } from "src/pages/BookDetail/style";
import { ReviewsProps } from "./types";

export const Reviews: React.FC<ReviewsProps> = ({ bookId }) => {
  // const myReviewContent = useTypedSelector(myComment);
  // const myReviewCheck = useTypedSelector(myCommentCheck);
  const commentList = useTypedSelector(comments);
  // const myComment = useTypedSelector(myId); // 나의 아이디 정보
  const myUserId = 17; // 나의 아이디 임시 데이터

  const { dispatch } = useSignIn();

  useEffect(() => {
    dispatch(reviewCommentList({ bookId, myUserId }));
    // dispatch(myReviewComment(myUserId));
  }, [bookId, dispatch]);

  if (commentList.length !== 0) {
    const reviewContentList = commentList.data.content;
    return (
      <div className="Reviews">
        {/* 정렬 부분 */}
        {/* <ReviewListHeader bookId={bookId} />*/}
        <ReviewList bookId={bookId} commentList={reviewContentList} myCommentId={myUserId} />
        <ReviewWrite
          bookId={bookId}
          // myReviewCheck={myReviewCheck}
          // myReviewContent={myReviewContent}
          myCommentId={myUserId}
        />
      </div>
    );
  }
  return (
    <FlexColum>
      <Box sx={{ pt: 0, marginRight: 5, marginTop: 5 }}>
        <Skeleton width="150px" variant="rectangular" />
      </Box>
      <Skeleton sx={{ marginTop: 2 }} variant="rectangular" width={700} height={220} />
      <Box sx={{ pt: 0, marginLeft: 33, marginTop: 5 }}>
        <Skeleton width="200px" height="50px" variant="rectangular" />
      </Box>
      <Skeleton sx={{ marginTop: 2 }} variant="rectangular" width={700} height={220} />
      <Box sx={{ pt: 0, marginLeft: 71, marginTop: 3 }}>
        <Skeleton width="130px" height="30px" variant="rectangular" />
      </Box>
    </FlexColum>
  );
};
