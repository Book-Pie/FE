import styled from "styled-components";

export const Contaniner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: 0 auto;
  flex-direction: column;

  & > div:first-child {
    width: 60%;
    margin: 0 auto;
  }
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
    padding: 1rem;
    border-bottom: 2px solid rgba(44, 62, 80, 1);
  }
  .withdrawal__warning {
    text-align: center;
    font-weight: 900;
    padding: 3rem 2rem 0rem 2rem;
    line-height: 1.5;
  }

  .withdrawal__warning--red {
    color: rgba(231, 76, 60, 1);
    font-weight: 900;
  }

  .withdrawal__dropDownWrap {
    margin-bottom: 2rem;
    margin-top: 2rem;
    div {
      width: 100%;
      box-sizing: border-box;
      margin-top: 0.5rem;
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
      flex: 3;
    }
    & > div:last-child {
      flex: 7;
    }
  }

  .withdrawal__buttons {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 10px;

    & > button:first-child {
      background-color: rgba(52, 152, 219, 1);
      color: white;
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

export const StyledSpan = styled.span`
  padding: 0.5rem;
  display: block;
`;
