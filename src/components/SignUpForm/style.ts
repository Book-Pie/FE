import styled, { css } from "styled-components";

export const SignUpWrapper = styled.section`
  margin: 2rem;

  button {
    font-weight: bold;
    font-size: 0.9rem;
  }
  form {
    width: 60%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    & > div {
      flex: 1;
    }
    & > div:last-child {
      margin: 1rem 1.5rem;
    }
  }
  a {
    display: block;
  }

  ${({ theme }) => theme.media.tab} {
    form {
      width: 80%;
    }
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 0;
    form {
      width: 100%;
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
  .timer {
    font-weight: bold;
    font-size: 15px;
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
  display: flex;
  justify-content: center;
  margin-top: 10px;
  a {
    display: inline-block;
    height: 50px;
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
      height: 50px;
    }
  }
`;
