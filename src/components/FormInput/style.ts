import styled, { css } from "styled-components";
import { InputProps } from "./types";

export const Input = styled.input<InputProps>`
  ${({ size }) =>
    size &&
    css`
      width: ${size}%;
    `}

  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: 1px solid rgba(122, 110, 110, 0.8);
  border-radius: 2px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgb(122, 110, 110);
    font-weight: bold;
  }
`;
