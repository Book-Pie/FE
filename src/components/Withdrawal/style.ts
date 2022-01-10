import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 70%;

  input {
    height: 60px;
  }

  /* & > div:first-child {
    width: 70%;
    margin: 0 auto;
  } */

  .withdrawal__text--center {
    text-align: center;
  }

  .withdrawal__title {
    font-size: 2.5rem;
    font-weight: 900;
    margin-top: 2rem;
  }
  .withdrawal__email {
    font-size: 1.5rem;
    font-weight: 900;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-bottom: 2px solid rgba(44, 62, 80, 1);
    color: ${props => props.theme.colors.mainDarkBrown};
  }
  .withdrawal__warning {
    text-align: center;
    font-weight: 900;
    font-size: 1.5rem;
    padding: 3rem 2rem;
    line-height: 1.5;
  }

  .withdrawal__warning--red {
    color: ${props => props.theme.colors.error};
    font-weight: 900;
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
      padding: 1rem;
      box-sizing: border-box;
    }
    & > div:first-child {
      flex: 2;
    }
    & > div:last-child {
      flex: 8;
    }
    input + div {
      margin-top: 15px;
    }
  }

  .withdrawal__buttons {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 10px;

    button {
      height: 50px;
      width: 100px;
      background-color: ${props => props.theme.colors.mainDarkBrown};
      color: ${props => props.theme.colors.white};
    }

    & > button {
      cursor: pointer;
      border: none;
      border-radius: 5px;
      font-size: 0.9rem;
      box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;

      width: 100px;
      & > a {
        padding: 0.5rem 0rem;
      }
    }
  }
`;
