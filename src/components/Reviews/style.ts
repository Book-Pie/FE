import styled from "styled-components";

export const CommentUl = styled.ul`
  padding-left: 0px;
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 700px;
  margin-top: 50px;
`;

export const ReviewListEmptyWrapper = styled.div`
  margin: 1rem 0;
  padding: 0 1rem;
`;

export const ReviewListEmptyParagraph = styled.p`
  margin: 0;
  padding: 75px 0;
  font-size: 22px;
  line-height: 1.8em;
  text-align: center;
  padding: 40px 0;
`;

export const ReviewItemWrapper = styled.li`
  padding: 17px 0 16px;
  border-top: 1px solid #e6e8eb;
  list-style-type: none;
`;

export const ReviewContent = styled.div`
  display: flex;
  color: #303538;
  font-size: 14px;
  letter-spacing: -0.03em;
  line-height: 1.5em;
  text-align: left;
  word-break: break-all;
`;

export const ContentWrapper = styled.div`
  max-width: 600px;
  padding-left: 20px;
`;

export const ReplyDate = styled.p`
  margin: 0;
`;

export const ContentBottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DeleteButton = styled.button`
  border: none;
  background: #fff;
  color: #808991;
  height: 30px;
`;

export const ClickArea = styled.div`
  text-align: right;
`;

export const ReviewContentTop = styled.div`
  width: 120px;
`;

export const ReviewContentBottom = styled.div``;

export const ReviewsListTitle = styled.h4`
  padding: 30px 0;
`;

export const BestReviewsListTitle = styled(ReviewsListTitle)`
  font-size: 20px;
  font-weight: bold;
  color: #4f3629;
`;

export const DateWrapper = styled.span`
  margin-left: 5px;
  color: #a2a2a2;
`;

export const BestCommentNickName = styled.span`
  font-size: 16px;
  margin-right: 10px;
`;

export const BestReviewContent = styled.div`
  border-top: 1px solid rgb(229, 229, 229);
  padding: 20px 0 30px 0;
  line-height: 1.5em;
  min-height: 130px;
`;

export const ReviewsListWrapper = styled.div``;

export const ContentArea = styled.div`
  width: 560px;
`;

export const LikeButton = styled.button`
  border-color: #d1d5d9;
  background: #fff;
  font-size: 13px;
  border: 1px solid #d1d5d9;
  border-radius: 4px;
  font-weight: 400;
  padding: 0 10px 0 5px;
  height: 25px;
  color: #7d8e9e;
  padding-top: 2px;
  width: 80px;

  &:hover {
    background-color: #f2f4f5;
  }
`;

export const ReviewEmptyWrapper = styled.div`
  padding-top: 13px;
`;

export const ReviewEmptyParagraph = styled.p`
  margin: 0;
  padding: 75px 0;
  color: #808991;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.8em;
  text-align: center;
  padding: 40px 0;
`;

export const BestCommentListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const BestCommentWrapper = styled.div`
  min-width: 340px;
  background-color: rgb(242, 242, 242);
  border: 1px solid #e3e3e3;
  padding: 30px 30px 0 30px;
  margin: 0 10px 0 10px;
  border-radius: 5px;
  flex: 1;

  div {
    margin: 10px 0 10px 0;
    color: #303538;
    font-size: 14px;
  }
`;

export const LikeButtonWrapper = styled.div`
  height: 44px;
  border-top: 1px solid rgb(229, 229, 229);
  padding-top: 10px;
`;

export const TextareaAutosize = styled.textarea<{ isDisabled?: boolean }>`
  width: 100%;
  border-radius: 5px;
  min-height: 100px;
  margin-bottom: 10px;
  padding: 12px 15px;
  font-size: 13px;
  border: 2px solid #d1d5d9;
  background-color: ${props => (props.isDisabled ? "#f2f4f5" : "white")};
`;

export const MyReviwContent = styled.p<{ margin?: boolean }>`
  font-size: 14px;
  color: #666;
  margin-top: ${props => props.margin && "14px;"};
`;

export const TextWrapper = styled.div`
  background: #f2f4f5;
  border-radius: 3px;
  padding: 30px;
  position: relative;
  margin-bottom: 10px;
`;

export const ButtonArea = styled.div`
  text-align: right;
`;

export const ReviewsContentWrapper = styled.div`
  margin-bottom: 100px;
`;
