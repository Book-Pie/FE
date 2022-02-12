import styled from "styled-components";

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
