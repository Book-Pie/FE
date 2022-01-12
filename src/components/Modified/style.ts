import styled from "styled-components";

export const ModifiedWrapper = styled.div`
  margin: 0 auto;
  max-width: 1000px;

  a {
    display: inline-block;
  }

  button {
    height: 50px;
    width: 100px;
  }

  .modified__title {
    font-size: 2.5rem;
    font-weight: 900;
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
    color: ${props => props.theme.colors.mainDarkBrown};
    font-weight: 900;
  }
  .modified__text {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .modified__form {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    flex-direction: column;
    & > .modified__form__row:first-child {
      border-top: 1px solid rgba(44, 62, 80, 1);
    }
  }
  .modified__form__row {
    flex: 1;
    display: flex;
    width: 100%;

    & > div:first-child {
      flex: 2;
      background-color: ${props => props.theme.colors.mainLightBrown};
      span {
        color: ${props => props.theme.colors.mainDarkBrown};
        font-weight: 900;
      }
    }
    & > div:last-child {
      flex: 8;
    }
  }

  .modified__form__cell {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 1rem 0.7rem 1.5rem;
    box-sizing: border-box;
    text-align: center;
    text-align: left;
    display: flex;
    align-items: center;
    height: 70px;

    input {
      width: 30%;
      border: 1px solid rgba(149, 165, 166, 0.6);
    }

    input + div {
      width: 40%;
      margin-left: 1rem;
      height: 40px;
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

    input {
      border: 1px solid rgba(149, 165, 166, 0.6);
    }
    label + input,
    div + div {
      margin-top: 1rem;
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

    button {
      padding: 0.5rem 1rem;
      color: white;
      border: none;
      border-radius: 5px;
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
      background-color: ${props => props.theme.colors.mainDarkBrown};
      cursor: pointer;
    }

    input {
      width: 30%;
      border: 1px solid rgba(149, 165, 166, 0.6);
    }
    input + input {
      margin-left: 15px;
    }
    & > div:nth-child(3),
    & > div:nth-child(5) {
      display: flex;
      width: 100%;
      gap: 15px;
      & > div {
        width: 30%;
      }
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
      background-color: ${props => props.theme.colors.mainDarkBrown};
      ${props => props.theme.shadow[30]};
    }
    button + button {
      margin-left: 10px;
    }
  }

  .modified__errorbox {
    margin: 0;
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
      ${props => props.theme.shadow[30]};
      border-radius: 5px;
    }

    button {
      width: 100%;
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      color: white;
      border-radius: 5px;
      background-color: ${props => props.theme.colors.mainDarkBrown};
      cursor: pointer;
    }
  }
`;
