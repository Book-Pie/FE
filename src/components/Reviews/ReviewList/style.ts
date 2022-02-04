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
  padding-top: 13px;
`;

export const ReviewListEmptyParagraph = styled.p`
  margin: 0;
  padding: 75px 0;
  color: #808991;
  font-size: 15px;
  font-weight: 700;
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
