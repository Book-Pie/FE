import React from "react";
import { commentLike, commentUnLike, deleteComment } from "src/modules/Slices/comment/commentSlice";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
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

export const ReviewItem: React.FC<ReviewItemProps> = ({ key, content, myCommentId }) => {
  const dispatch = useDispatch();
  const { reviewId, likeCheck, reviewLikeCount, reviewDate, nickname, userId, rating } = content;

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
    if (likeCheck === false) {
      dispatch(
        commentLike({
          reviewId,
          userId: myCommentId,
        }),
      );
    } else if (likeCheck === true) {
      dispatch(
        commentUnLike({
          reviewId,
          userId: myCommentId,
        }),
      );
    }
  };

  return (
    <ReviewItemWrapper>
      <ClickArea>{userId === myCommentId && <Button onClick={deleteClick}>x</Button>}</ClickArea>
      <ReviewContent>
        <ReviewContentTop>
          <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
          <p>{nickname}</p>
          <ContentBottom>
            <ReplyDate>{reviewDate}</ReplyDate>
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
