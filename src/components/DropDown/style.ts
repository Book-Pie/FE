import styled, { css } from "styled-components";
import { UlWrapperProps } from "./types";

export const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const Select = styled.div`
  display: flex;
  background: white;
  height: 2rem;
  width: 5rem;
  border-radius: 4px;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-weight: 600;
  color: rgb(73, 80, 87);
  font-size: 0.875rem;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  cursor: pointer;

  & > svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const OpenCss = css`
  opacity: 1;
  transform: translateY(0);
`;

const CloseCss = css`
  transition: opacity 0.2s, transform 0.5s, z-index 0.35s ease-in;
`;

export const UlWrapper = styled.ul<UlWrapperProps>`
  list-style: none;
  padding: 0;
  margin: 0;
  opacity: 0;
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
  transition: opacity 0.5s, transform 0.35s, z-index 0.35s ease-in;
  transform: translateY(-50%);

  ${({ visible }) => visible && OpenCss}
  ${({ visible }) => !visible && CloseCss}

  li {
    cursor: pointer;
    font-weight: 600;
    font-size: 0.875rem;
    padding: 0.75rem 1rem;
  }
  li + li {
    border-top: 1px solid rgb(241, 243, 245);
  }
  li:hover {
    background: rgb(248, 249, 250);
  }
`;
