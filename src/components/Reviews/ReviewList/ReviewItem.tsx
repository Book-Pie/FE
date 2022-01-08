import React from "react";
import { ContentWrapper, ReviewContent, ReviewItemWrapper } from "./style";
import { useDispatch } from "react-redux";
import { deleteComment } from "src/modules/Slices/commentSlice";
import { ReplyDate, ContentBottom, Button, ClickArea, ReviewContentTop, ReviewContentBottom } from "./style";
import { ReviewItemProps } from "./types";
import { Rating } from "@mui/material";

export const ReviewItem: React.FC<ReviewItemProps> = ({ key, content, myCommentId }) => {
  const dispatch = useDispatch();

  const deleteReview = props => {
    dispatch(
      deleteComment({
        id: content.id,
      }),
    );
  };

  const deleteClick = () => {
    if (confirm("댓글을 정말로 삭제하시겠습니까?") == true) {
      deleteReview(content.id);
    } else {
      return;
    }
  };

  return (
    <>
      <ReviewItemWrapper>
        <ClickArea>{content.user_id == myCommentId && <Button onClick={deleteClick}>x</Button>}</ClickArea>
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
              <div dangerouslySetInnerHTML={{ __html: content.content }}></div>
            </ContentWrapper>
          </ReviewContentBottom>
          {/* 좋아요 영역 */}
        </ReviewContent>
      </ReviewItemWrapper>
    </>
  );
};
