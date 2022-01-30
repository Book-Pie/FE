import React from "react";
import { commentLike, deleteComment } from "modules/Slices/comment/commentSlice";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useTypedSelector } from "modules/store";
import { userReduceSelector } from "modules/Slices/user/userSlice";
import { reviewDateFormat } from "utils/formatUtil";
import {
  ContentWrapper,
  ReviewContent,
  ReviewItemWrapper,
  ReplyDate,
  ContentBottom,
  Button,
  ClickArea,
  ReviewContentTop,
  ReviewContentBottom,
  ContentArea,
  LikeButton,
} from "./style";
import { ReviewItemProps } from "./types";

export const ReviewItem: React.FC<ReviewItemProps> = ({ content, myCommentId }) => {
  const dispatch = useDispatch();
  const { reviewId, likeCheck, reviewLikeCount, reviewDate, nickName, rating, userId } = content;

  const commentDate = reviewDateFormat(reviewDate);

  const myUserStatus = useTypedSelector(userReduceSelector);
  const { user } = myUserStatus;

  const deleteClick = () => {
    if (window.confirm("댓글을 정말로 삭제하시겠습니까?") === true) {
      deleteReview(reviewId);
    }
  };

  const deleteReview = (reviewId: number) => {
    dispatch(
      deleteComment({
        id: reviewId,
      }),
    );
  };

  const likeClick = () => {
    dispatch(
      commentLike({
        reviewId,
        userId: myCommentId,
      }),
    );
  };

  return (
    <ReviewItemWrapper>
      <ClickArea>{user?.id === userId && <Button onClick={deleteClick}>x</Button>}</ClickArea>
      <ReviewContent>
        <ReviewContentTop>
          <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
          <p>{nickName}</p>
          <ContentBottom>
            <ReplyDate>{commentDate}</ReplyDate>
          </ContentBottom>
        </ReviewContentTop>
        <ReviewContentBottom>
          <ContentWrapper>
            <ContentArea dangerouslySetInnerHTML={{ __html: content.content }} />
            <ClickArea>
              <LikeButton onClick={likeClick}>
                <ThumbUpIcon sx={{ fontSize: 12 }} />
                좋아요
                {likeCheck}
                {reviewLikeCount}
              </LikeButton>
            </ClickArea>
          </ContentWrapper>
        </ReviewContentBottom>
      </ReviewContent>
    </ReviewItemWrapper>
  );
};
