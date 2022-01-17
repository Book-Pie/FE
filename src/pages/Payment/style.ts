import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 50px 20px;
  button {
    border: none;
    box-shadow: rgb(0 0 0 / 15%) 0px 4px 16px 0px;
    padding: 25px 0;
    cursor: pointer;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
    transition: transform 0.5s ease;
  }
  button:hover {
    transform: scale(1.03);
    opacity: 0.7;
  }

  #kakao {
    background-color: #fee500;
    color: #000000 85%;
  }

  #inicis {
    background-color: #c1272c;
    color: #fff;
  }

  #close {
    background-color: #4f3629;
    color: #fff;
    width: 100%;
  }

  p {
    margin: 20px 0;
    text-align: center;
  }
  .payment__title {
    display: flex;
    align-items: center;
    gap: 10px;
    img {
      width: 200px;
      height: 60px;
    }
    h1 {
      font-size: 50px;
      margin: 20px 0;
      font-weight: 900;
    }
  }

  .payment {
    max-width: 500px;
    margin: 0 auto;
  }

  .payment__buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .payment__buttons {
    div {
      flex: 1;
      display: flex;
      gap: 20px;
    }
    button {
      width: 50%;
    }
  }

  .payment__result {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;
    p {
      font-size: 25px;
    }
  }
  .payment__price {
    font-size: 30px;
  }
  .payment__priceInput {
    margin: 20px 0;
  }
  .payment__priceButton {
    margin: 20px 0;
    & > div {
      display: flex;
      gap: 10px;
      margin: 20px 0;
    }
    button {
      border: 1px solid transparent;
      flex: 1;
      background-color: rgb(18, 184, 134);
      color: white;
      padding: 0 10px;
      font-size: 15px;
      height: 50px;
      &:active {
        background-color: white;
        border: 1px solid rgb(18, 184, 134);
        color: black;
      }
    }
  }
  .payment__totalPoint {
    font-size: 35px;
    margin: 20px 0;
    width: 100%;
  }
`;
