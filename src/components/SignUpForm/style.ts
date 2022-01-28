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
  margin-bottom: 1rem;
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
