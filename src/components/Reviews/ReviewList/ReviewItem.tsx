import React from "react";
import { ReviewContent, ReviewItemWrapper } from "./style";
import { useDispatch } from "react-redux";
import { deleteComment } from "src/modules/Slices/commentSlice";
import { Content, ReplyDate, ContentBottom, Button, ClickArea, ReviewContentTop, ReviewContentBottom } from "./style";
import { ReviewItemProps, TruncateProps } from "./types";

export const ReviewItem: React.FC<ReviewItemProps> = ({ key, content, myComment }) => {
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
        <div className="ReviewItem_Right">
          <div className="ReviewItem_Right_Top">
            <ClickArea>{content.user_id == myComment && <Button onClick={deleteClick}>x</Button>}</ClickArea>
            <ReviewContent>
              <ReviewContentTop>
                <p>{content.rating}점</p>
                <p>{content.nickname}</p>
                <ContentBottom>
                  <ReplyDate>{content.reviewDate}</ReplyDate>
                </ContentBottom>
              </ReviewContentTop>
              <ReviewContentBottom>
                <Content>{content.content}</Content>
              </ReviewContentBottom>
              {/* 좋아요 영역 */}
            </ReviewContent>
          </div>
        </div>
      </ReviewItemWrapper>
    </>
  );
};
