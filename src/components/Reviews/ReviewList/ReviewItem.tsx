import React from "react";
import { ReviewContent, ReviewItemWrapper } from "./style";
import { useDispatch } from "react-redux";
import { deleteComment } from "src/modules/Slices/commentSlice";
import { Content, ReplyDate, ContentBottom, Button, ClickArea, ReviewContentTop, ReviewContentBottom } from "./style";
import { ReviewItemProps, TruncateProps } from "./types";

export const ReviewItem: React.FC<ReviewItemProps> = props => {
  const { key, content } = props;

  const dispatch = useDispatch();

  const deleteReview = () => {
    console.log("deleteReview 테스트 : ", content);
    dispatch(
      deleteComment({
        id: content.id,
      }),
    );
  };

  const deleteClick = ({ user_id }: any) => {
    if (confirm("댓글을 정말로 삭제하시겠습니까?") == true) {
      deleteReview();
    } else {
      return;
    }
  };

  return (
    <>
      <ReviewItemWrapper>
        <div className="ReviewItem_Right">
          <div className="ReviewItem_Right_Top">
            <ClickArea>{content.user_id == 5 && <Button onClick={deleteClick}>x</Button>}</ClickArea>
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
