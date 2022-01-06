import styled from "styled-components";

export const ModifiedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;

  a {
    display: inline-block;
  }

  .modified {
    flex: 1;
  }

  .modified__title {
    font-size: 2.5rem;
    font-weight: 900;
  }
  .modified__email {
    color: rgba(52, 152, 219, 1);
    font-weight: 900;
  }
  .modified__form {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    border-top: 2px solid rgba(44, 62, 80, 1);
    flex-direction: column;
  }
  .modified__form--row {
    flex: 1;
    display: flex;
    width: 100%;

    & > div:first-child {
      flex: 2;
      background-color: rgba(52, 152, 219, 0.2);
    }
    & > div:last-child {
      flex: 8;
    }
  }
  .modified__form--bottom {
    flex: 1;
    display: flex;
    width: 100%;
    & > div:first-child {
      flex: 2;
      background-color: rgba(52, 152, 219, 0.2);
    }
    & > div:last-child {
      flex: 8;
    }
  }
  .modified__form--inner {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 0rem 0.7rem 1.5rem;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    text-align: left;
    display: flex;
    align-items: center;
    height: 50px;

    label,
    span {
      font-size: 1rem;
      font-weight: 900;
    }
    & > span:first-child {
      color: rgba(44, 62, 80, 0.7);
    }
  }
  .modified__form__password {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 0rem 4rem 1.5rem;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    text-align: left;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    label {
      width: 150px;
    }

    label,
    & > span:first-child {
      font-weight: 900;
      color: rgba(44, 62, 80, 0.7);
    }

    label,
    & > div {
      display: flex;
      align-items: center;
    }
    div + div {
      margin-top: 1rem;
    }
  }
  .modified__form__address {
    border-bottom: 1px solid rgba(149, 165, 166, 0.6);
    border-right: 1px solid rgba(149, 165, 166, 0.6);
    padding: 0.7rem 0rem 4rem 1.5rem;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    text-align: left;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;

    label,
    & > span:first-child {
      font-weight: 900;
      color: rgba(44, 62, 80, 0.7);
    }

    & > div {
      input {
        width: 30%;
      }

      input + input {
        margin-left: 15px;
      }
      button {
        padding: 0.5rem 1rem;
        color: white;
        border: none;
        box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
        border-radius: 5px;
        border: 1px solid rgba(149, 165, 166, 0.6);
        cursor: pointer;
      }
      button:first-child {
        background-color: rgba(52, 152, 219, 1);
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
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
      border-radius: 5px;
      border: 1px solid rgba(149, 165, 166, 0.6);
      cursor: pointer;
    }
    button:first-child {
      background-color: rgba(52, 152, 219, 1);
    }
    button + button {
      margin-left: 0.5rem;
    }
    & > .modified__buttons--reset {
      color: black;
    }
  }

  input {
    border: 1px solid rgba(149, 165, 166, 0.6);
    outline: none;
    box-sizing: border-box;
    width: 30%;
  }
  .modified__errorbox {
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

    button {
      margin-top: 1rem;
      padding: 0.5rem 1rem;
      color: white;
      border: none;
      box-shadow: rgb(0 0 0 / 10%) 0px 4px 16px 0px;
      border-radius: 5px;
      border: 1px solid rgba(149, 165, 166, 0.6);
      background-color: rgba(52, 152, 219, 1);
      cursor: pointer;
    }
  }
`;
