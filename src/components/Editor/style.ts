import styled from "styled-components";
import { ReactQuillWrapperProps } from "./types";

export const ReactQuillWrapper = styled.div<ReactQuillWrapperProps>`
  .ql-container {
    height: ${props => (props.height ? `${props.height}px` : "auto")};
    background-color: ${props => (props.isDisabled ? "#f2f4f5" : "white")};
  }
  .reactQuill__textLimitBox {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
  }
`;
