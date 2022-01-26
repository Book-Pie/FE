import styled, { css } from "styled-components";

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin: 1rem 0;
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export const Row = styled.div<{ isError: boolean }>`
  text-align: left;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  label {
    font-size: 1.1rem;
    letter-spacing: 2px;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  label + input {
    margin-top: 0.7rem;
  }
  input {
    height: 55px;
    border-radius: 5px;
  }
  input + div {
    margin-top: 0.5rem;
    padding: 1rem 0.7rem;
  }

  ${({ isError }) =>
    isError &&
    css`
      input {
        border-color: ${({ theme }) => theme.colors.error};
        ::placeholder {
          color: ${({ theme }) => theme.colors.error};
        }
      }
      label {
        color: ${({ theme }) => theme.colors.error};
      }
    `}

  ${({ theme }) => theme.media.mobile} {
    input + div {
      margin-top: 0.5rem;
      padding: 0.7rem;
      font-size: 18px;
    }
  }
`;
