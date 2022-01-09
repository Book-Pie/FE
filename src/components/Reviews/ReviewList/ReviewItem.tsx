import React from "react";
import { deleteComment } from "src/modules/Slices/comment/commentSlice";
import { useDispatch } from "react-redux";
import { Rating } from "@mui/material";
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
} from "./style";
import { ReviewItemProps } from "./types";

export const ReviewItem: React.FC<ReviewItemProps> = ({ key, content, myCommentId }) => {
  const dispatch = useDispatch();
  const { id } = content;

  const deleteReview = (id: number) => {
    dispatch(
      deleteComment({
        id,
      }),
    );
  };

  const deleteClick = () => {
    if (window.confirm("댓글을 정말로 삭제하시겠습니까?") === true) {
      deleteReview(id);
    }
  };

  return (
    <ReviewItemWrapper>
      <ClickArea>{content.userId === myCommentId && <Button onClick={deleteClick}>x</Button>}</ClickArea>
      <ReviewContent>
        <ReviewContentTop>
          <Rating name="read-only" precision={0.5} value={content.rating} size="small" readOnly />
          <p>{content.nickname}</p>
          <ContentBottom>
            <ReplyDate>{content.reviewDate}</ReplyDate>
          </ContentBottom>
        </ReviewContentTop>
        <ReviewContentBottom>
          <ContentWrapper>
            <div dangerouslySetInnerHTML={{ __html: content.content }} />
          </ContentWrapper>
        </ReviewContentBottom>
        {/* 좋아요 영역 */}
      </ReviewContent>
    </ReviewItemWrapper>
  );
};
