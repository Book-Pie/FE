import styled, { css } from "styled-components";
import { StyledRowProps } from "./types";

export const Row = styled.div<StyledRowProps>`
  position: relative;
  text-align: left;

  input {
    margin: 0.5rem 0;
    ${({ isError }) =>
      isError &&
      css`
        border: 1px solid red;
      `}
  }

  button {
    padding: 0.3rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 900;
    background-color: rgb(245, 246, 247);
    border: 1px solid black;
    border-radius: 2px;
  }
`;

export const Button = styled.button`
  width: 100%;
  color: white;
  padding: 1rem;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  background-color: rgb(52, 152, 219);
  border: none;
  border-radius: 5px;
  transition: background-color 0.25s ease-in;
  &:hover {
    background-color: rgba(52, 152, 219, 0.5);
  }
`;
