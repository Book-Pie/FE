import styled from "styled-components";

export const ModifiedWrapper = styled.div`
  padding: 1rem;
  a {
    display: inline-block;
  }
  label {
    font-weight: 500;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  button {
    height: 50px;
    width: 100px;
  }

  .modified__title {
    font-size: 2.5rem;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  .modified__imgUpload {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    div + div {
      margin-top: 15px;
    }

    img {
      width: 200px;
      height: 200px;
    }
    input {
      display: none;
    }
    span {
      width: 100px;
    }
    label + span {
      margin-left: 15px;
    }
    label {
      cursor: pointer;
    }
  }
  .modified__email {
    color: ${({ theme }) => theme.colors.mainDarkBrown};
    font-weight: 900;
  }
  .modified__text {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    line-height: 1.3;
    gap: 15px;
  }
  .modified__form {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    flex-direction: column;
    input {
      height: 50px;
    }
    & > .modified__form__row:first-child {
      border-top: 1px solid rgba(44, 62, 80, 1);
    }
    & > .errorMessage {
      width: 100%;
      margin-top: 5px;
      padding: 1rem;
      font-size: 1rem;
      height: 100%;
    }
  }
  .modified__form__row {
    flex: 1;
    display: flex;
    width: 100%;

    & > div:first-child {
      flex: 1.5;
      background-color: ${({ theme }) => theme.colors.mainLightBrown};
      span {
        color: ${({ theme }) => theme.colors.mainDarkBrown};
        font-weight: 900;
        font-size: 1.2rem;
      }
    }
    & > div:last-child {
      flex: 8.5;
    }
  }
  .modified__form__cell {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 1rem 0.7rem 1.5rem;
    text-align: center;
    text-align: left;
    display: flex;
    align-items: center;
    min-height: 70px;

    input {
      width: 100%;
      border: 1px solid rgba(149, 165, 166, 0.6);
    }

    input + div {
      width: 40%;
      margin-left: 1rem;
      display: flex;
      align-items: center;
    }
  }
  .modified__form__password {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 1rem 4rem 1.5rem;
    flex-direction: column;
    box-sizing: border-box;
    text-align: center;
    text-align: left;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;

    input {
      border: 1px solid rgba(149, 165, 166, 0.6);
    }
    label + input {
      margin-top: 0.5rem;
    }
  }
  .modified__form__address {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 1rem 4rem 1.5rem;
    flex-direction: column;
    box-sizing: border-box;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;

    & > div {
      display: flex;
      flex: 1;
      gap: 15px;
      input {
        flex: 1;
        border: 1px solid rgba(149, 165, 166, 0.6);
      }

      button {
        padding: 0.5rem 1rem;
        color: white;
        border: none;
        width: 150px;
        border-radius: 5px;
        box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
        background-color: ${({ theme }) => theme.colors.mainDarkBrown};
        cursor: pointer;
      }

      & > .errorMessage {
        flex: 1;
      }
    }

    & > div:nth-child(3),
    & > div:nth-child(5) {
      width: 100%;
    }
  }
  .modified__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    button {
      padding: 0.5rem 1rem;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.mainDarkBrown};
      ${({ theme }) => theme.shadow[0]};
      :hover {
        opacity: 0.8;
      }
    }
    button + button {
      margin-left: 10px;
    }
    .modified__buttons--reset {
      background-color: ${p => p.theme.colors.error};
    }
  }
  .modified__errorbox {
    margin: 0;
    width: 100%;
  }
  .fixed {
    background-color: rgba(200, 214, 229, 0.3);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    & > div {
      padding: 1rem;
      background-color: white;
      ${({ theme }) => theme.shadow[30]};
      border-radius: 5px;
    }

    button {
      width: 100%;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      color: white;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.colors.mainDarkBrown};
      cursor: pointer;
    }
  }

  @media screen and (max-width: 800px) {
    .modified__form__cell {
      flex-direction: column;
      justify-content: center;
      height: auto;
      padding: 1rem 1rem;
      input + div {
        margin: 0;
        margin-top: 0.5rem;
        width: 100%;
      }
    }
    .modified__form__address,
    .modified__form__password {
      padding: 1rem 1rem;
      gap: 10px;
      input {
        padding-left: 0.5rem;
      }
    }
    .modified__form__row {
      & > div:first-child {
        flex: 2;
        span {
          font-size: 1.1rem;
        }
      }
      & > div:last-child {
        flex: 8;
      }
    }
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 1rem 0.5rem;

    input {
      font-size: 0.6rem;
    }
    label {
      font-size: 0.7rem;
    }

    .modified__title {
      font-size: 2rem;
      text-align: center;
      margin-top: 1rem;
    }
    .modified__text {
      flex-direction: column;
      gap: 10px;
      span {
        font-size: 0.7rem;
      }
    }

    .modified__form__cell {
      padding: 0.5rem;
      input {
        padding-left: 0.5rem;
      }
    }
    .modified__form__row {
      span {
        font-size: 0.7rem;
      }

      & > div:first-child {
        flex: 3;
        span {
          font-size: 0.8rem;
        }
      }
      & > div:last-child {
        flex: 6;
      }
    }
    .modified__buttons {
      margin-top: 0.5rem;
      button {
        height: 40px;
        padding: 0.2rem;
        font-size: 0.7rem;
        :hover {
          opacity: 0.7;
        }
      }
    }

    .modified__form {
      .errorMessage {
        width: 100%;
        margin-top: 5px;
        padding: 0.5rem;
        font-size: 0.8rem;
        line-height: 1.3;
      }
    }
    .modified__form__address,
    .modified__form__password {
      padding: 0.5rem;
      input {
        padding-left: 0.5rem;
      }
    }
    .modified__form__address {
      & > div {
        flex-direction: column;
        button {
          height: 40px;
          padding: 0.2rem;
          font-size: 0.7rem;
        }
      }
    }

    .modified__imgUpload {
      & > div:last-child {
        justify-content: center;
        width: 80%;
        span {
          flex: 1;
          justify-content: center;
        }
      }
    }
  }
`;
