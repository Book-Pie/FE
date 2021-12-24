import styled, { css } from "styled-components";
import { PopupWrraperProps } from "./types";

export const PopupWrraperOpenCss = css`
  z-index: 20;
  transform: rotateX(0deg);
`;

export const PopupWrraperCloseCss = css`
  transition: transform 0.5s, z-index 1s ease-in;
`;

export const PopupWrraper = styled.div<PopupWrraperProps>`
  position: fixed;
  top: 5%;
  color: white;
  right: 5%;
  cursor: pointer;
  z-index: 0;
  transition: transform 1s, z-index 0.25s ease-in;
  transform: rotateX(90deg);
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;

  ${({ visible }) => visible && PopupWrraperOpenCss}
  ${({ visible }) => !visible && PopupWrraperCloseCss} 


  &.green {
    background: rgb(18, 184, 134);
  }
  &.red {
    background: #e74c3c;
  }
`;
