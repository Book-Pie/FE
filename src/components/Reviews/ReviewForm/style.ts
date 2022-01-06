import styled from "styled-components";

export const TextareaAutosize = styled.textarea`
  width: 95%;
  border-radius: 5px;
  min-height: 100px;
  padding: 12px 15px;
  font-size: 13px;
  font-weight: 700;
  border: 2px solid #d1d5d9;
  background-color: ${props => (props.readOnly ? "#f2f4f5" : "white")};
`;

export const Button = styled.button``;

export const ButtonArea = styled.div`
  text-align: right;
`;

// export const MyReviewTextarea = styled.div`
//   padding: 18px;
//   border-radius: 3px;
//   background: #f2f4f5;
//   width: 95%;
//   border-radius: 5px;
//   min-height: 100px;
//   font-size: 16px;
//   border: 2px solid #d1d5d9;
// `;
