import styled, { css } from "styled-components";
import { ErrorWrapperProps, InputWrapperProps } from "./types";

export const InputWrapper = styled.div<InputWrapperProps>`
  text-align: left;
  padding: 0.5rem 0;

  div + div {
    margin-top: 10px;
  }

  input {
    padding: 0.9375rem 0.875rem;
    border-radius: 5px;
    cursor: pointer;

    ${({ isError }) =>
      !isError &&
      css`
        :hover {
          border: 1px solid black;
        }
      `}

    ${({ isError }) =>
      isError &&
      css`
        border: 1px solid ${props => props.theme.colors.error};
        ::placeholder {
          color: ${props => props.theme.colors.error};
          font-weight: 100;
        }
      `}
  }
  label {
    ${({ isError }) =>
      isError &&
      css`
        color: ${props => props.theme.colors.error};
        font-weight: bold;
      `}
  }
`;

export const ButtonWrapper = styled.div`
  button {
    margin-top: 0.5rem;
    width: 100%;
    padding: 1rem;
    font-weight: bold;
  }
`;

export const SignUpWrapper = styled.div`
  padding: 2rem;
  & > form {
    display: flex;
  }

  & > form > div {
    flex: 1;
  }
  & > form > div:last-child {
    margin: 1.5rem;
    margin-top: 2rem;
  }
`;
export const DaumPostWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  background-color: rgba(178, 190, 195, 0.3);
  & > div {
    background-color: white;
    padding: 1rem;
    border-radius: 5px;
    ${props => props.theme.shadow[30]};
  }
  button {
    margin-top: 0.5rem;
    width: 400px;
    padding: 1rem;
    font-weight: bold;
  }
`;

export const ErrorWrapper = styled.div<ErrorWrapperProps>`
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.colors.darkGrey};
  background-color: rgba(178, 190, 195, 0.3);
  border-radius: 5px;
  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid ${props => props.theme.colors.error};
      background-color: rgba(235, 77, 75, 0.1);
    `}
  & > div {
    text-align: left;
  }
  & > div + div {
    margin-top: 1rem;
  }
`;

export const Oauths = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
  a {
    height: 50px;
    display: block;
    ${props => props.theme.shadow[10]}
  }
  img {
    height: 100%;
    width: 100%;
  }
`;
