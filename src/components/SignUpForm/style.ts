import styled, { css } from "styled-components";

export const SignUpWrapper = styled.section`
  margin: 2rem;
  form {
    display: flex;
    & > div {
      flex: 1;
    }
    & > div:last-child {
      margin-top: 2rem;
      margin-left: 1.5rem;
    }
  }
  a {
    display: block;
  }
  ${({ theme }) => theme.media.mobile} {
    margin: 0;
    form {
      flex-direction: column;
      & > div:last-child {
        margin: 0;
      }
    }
  }
`;

export const InputWrapper = styled.div<{ isError?: boolean }>`
  text-align: left;
  margin: 1rem 0;

  div + div {
    margin-top: 10px;
  }

  input {
    padding: 0.9375rem 0.875rem;
    border-radius: 5px;
    cursor: pointer;
  }
  label {
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  ${({ isError }) => {
    return (
      isError &&
      css`
        input {
          border: 1px solid ${({ theme }) => theme.colors.error};
          ::placeholder {
            color: ${({ theme }) => theme.colors.error};
          }
        }
        label {
          color: ${({ theme }) => theme.colors.error};
        }
      `
    );
  }}

  ${({ theme }) => theme.media.mobile} {
    label {
      font-size: 0.8rem;
    }
    input {
      padding: 0.5375rem 0.575rem;
    }
  }
`;

export const ErrorWrapper = styled.div<{ isError: boolean }>`
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkGrey};
  background-color: rgba(178, 190, 195, 0.3);
  border-radius: 5px;
  ${({ isError }) =>
    isError &&
    css`
      border: 1px solid ${({ theme }) => theme.colors.error};
      background-color: rgba(235, 77, 75, 0.1);
    `}
  & > div {
    text-align: left;
  }
  & > div + div {
    margin-top: 1rem;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0.7rem;
    span {
      font-size: 0.7rem;
    }
    & > div {
      padding: 0.5rem;
    }
  }
`;

export const ButtonWrapper = styled.div`
  button {
    width: 100%;
    padding: 1rem;
    margin-bottom: 0.5rem;
  }
  ${({ theme }) => theme.media.mobile} {
    button {
      margin-bottom: 0.5rem;
      height: 65px;
    }
  }
`;
export const Oauths = styled.div`
  gap: 15px;
  a {
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
    height: 70px;
    display: block;
    :hover {
      opacity: 0.8;
    }
  }
  img {
    height: 100%;
    width: 100%;
  }
  ${({ theme }) => theme.media.mobile} {
    a {
      width: 100%;
      height: 70px;
    }
  }
`;

export const DaumPostWrapper = styled.div<{ isVisible: boolean }>`
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
  transition: transform 0.5s ease-in;
  transform: translateY(100%);
  min-width: 375px;

  ${({ isVisible }) => {
    return (
      isVisible &&
      css`
        transform: translateY(0%);
      `
    );
  }}

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 5px;
    padding: 1rem;
    ${({ theme }) => theme.shadow[0]};
  }
  button {
    margin-top: 0.5rem;
    width: 100%;
    padding: 1rem;
  }

  ${({ theme }) => theme.media.mobile} {
    & > div {
      width: 100%;
      height: 100%;
    }
    button {
      margin-top: 0.5rem;
      width: 100%;
      padding: 0.5rem;
    }
  }
`;
