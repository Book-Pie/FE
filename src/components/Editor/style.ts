import styled from "styled-components";
import { ReactQuillContainerProps } from "./types";

export const ReactQuillContainer = styled.div<ReactQuillContainerProps>`
  .ql-container {
    height: ${({ height }) => `${height}px`};
  }
  .reactQuill__textLimitBox {
    margin-top: 0.5rem;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
  }
`;
