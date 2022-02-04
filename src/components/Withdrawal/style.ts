import styled from "styled-components";

export const WithDrawalWrapper = styled.div`
  margin: 0 auto;
  width: 50%;

  input {
    height: 60px;
  }

  .withdrawal__text--center {
    text-align: center;
  }

  .withdrawal__title {
    font-size: 2.5rem;
    font-weight: 900;
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.darkGrey};
    text-align: center;
  }
  .withdrawal__email {
    font-size: 1.5rem;
    font-weight: 900;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(44, 62, 80, 1);
    color: ${({ theme }) => theme.colors.mainDarkBrown};
  }
  .withdrawal__warning {
    text-align: center;
    font-size: 1.5rem;
    padding: 3rem 0.5rem;
    line-height: 1.5;
  }

  .withdrawal__warning--red {
    color: ${({ theme }) => theme.colors.error};
  }

  .withdrawal__dropDown {
    margin: 1rem 0;
    div {
      width: 100%;
    }
    p {
      padding: 1rem;
    }

    & > div > div {
      padding: 1rem;
    }
  }
  .withdrawal__form {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;
  }
  .withdrawal__row {
    display: flex;
    flex: 1;
    font-size: 1.1rem;
    font-weight: 900;
    align-items: center;
    & > div {
      padding: 1rem 0rem;
      box-sizing: border-box;
    }
    & > div:first-child {
      flex: 3.5;
      display: flex;
    }
    & > div:last-child {
      flex: 7;
    }
    input + div {
      margin-top: 15px;
    }
  }

  .withdrawal__buttons {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;

    & > button {
      height: 50px;
      background-color: ${({ theme }) => theme.colors.error};
      color: ${({ theme }) => theme.colors.white};
      cursor: pointer;
      border: none;
      border-radius: 5px;
      font-size: 0.9rem;
      width: 100px;
      ${({ theme }) => theme.shadow[0]};
      :hover {
        opacity: 0.8;
      }
    }
  }

  @media screen and (max-width: 800px) {
    width: 70%;
  }

  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    padding: 0 1rem;
    input {
      font-size: 0.8rem;
      height: 50px;
    }

    .withdrawal__email {
      padding: 1rem 0;
      font-size: 1.2rem;
    }
    .withdrawal__warning {
      padding: 1rem 0.4rem;
    }
    .withdrawal__row {
      & > span {
        font-size: 0.8rem;
      }
      & > div:first-child {
        flex: 4;
        font-size: 0.8rem;
      }
    }
    .withdrawal__dropDown {
      & > div {
        height: 60px;
      }
    }
    .withdrawal__text--center {
      font-size: 1rem;
    }
    .withdrawal__form {
      margin: 1rem 0;
    }
    .errorMessage {
      font-size: 15px;
      padding: 0.7rem;
    }
  }
`;
