import styled from "styled-components";

export const OrderFormWrapper = styled.div`
  width: 80%;
  margin: 1.5rem auto;
  background-color: red;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};

  h1 {
    font-size: 35px;
    font-weight: 900;
    text-align: center;
    margin: 30px 0;
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  button {
    height: 50px;
    font-size: 20px;
  }
  input {
    height: 50px;
  }

  .paymentForm__form {
    display: flex;
    flex-direction: column;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    margin: 0;
  }
`;

export const OrderFormRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  input {
    flex: 1;
    font-size: 1rem;
  }
  & > div {
    flex: 1;
  }
  ${({ theme }) => theme.media.mobile} {
    margin-bottom: 15px;
    input {
      font-size: 15px;
      padding-left: 15px;
    }
    .errorMessage {
      padding: 15px;
      font-size: 18px;
    }
  }
`;

export const DropdownWrapper = styled.div`
  margin-bottom: 15px;
  & > div {
    width: 100%;
    box-sizing: border-box;
  }
  & > div > div {
    padding: 20px;
    height: 50px;
    font-size: 15px;
  }
  span {
    font-size: 15px;
    height: 50px;
    padding: 20px;
    display: block;
  }
`;
export const OrderFormText = styled.p`
  color: ${({ theme }) => theme.colors.darkGrey};
  margin: 1.2rem 0;
  font-size: 1.8rem;
  font-weight: 900;
  ${({ theme }) => theme.media.mobile} {
    margin: 1rem 0;
    font-size: 1.1rem;
  }
`;

export const OrderFormPayment = styled.div`
  padding: 20px 30px;
  ${({ theme }) => theme.shadow[0]};
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 7px;
  margin-bottom: 20px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    span {
      color: ${({ theme }) => theme.colors.darkGrey};
      font-size: 20px;
    }
    & > span:last-child {
      font-weight: 600;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
    }
  }
  div + div {
    margin-top: 20px;
  }
  & > div:last-child {
    border-top: 1px solid rgba(99, 110, 114, 0.2);
    padding-top: 20px;
    span:last-child {
      font-weight: 900;
      color: ${({ theme }) => theme.colors.error};
    }
  }
`;

export const OrderResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .result__title {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    padding-bottom: 35px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainLightBrown};
    p {
      font-size: 1.7rem;
      font-weight: 900;
    }
    div {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(18, 184, 134);
      color: white;
      border-radius: 50%;
    }
  }

  .result__info {
    span {
      display: block;
    }
    span:first-child {
      width: 120px;
      font-size: 25px;
      font-weight: 900;
      ${({ theme }) => theme.colors.darkGrey};
    }
    span:last-child {
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 17px;
      color: ${({ theme }) => theme.colors.info};
    }
    div {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }
    div + div {
      margin-top: 20px;
    }
  }
  .result__price {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    span:first-child {
      font-size: 2.5rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
    span:last-child {
      font-size: 2rem;
      max-width: 250px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .result__button {
    display: flex;
    gap: 1rem;
  }

  ${({ theme }) => theme.media.mobile} {
    gap: 1.2rem;
    .result__title {
      margin-top: 1rem;
      p {
        font-size: 1.5rem;
        line-height: 1.2;
      }
    }

    .result__price {
      span:first-child {
        font-size: 1.5rem;
      }
      span:last-child {
        font-size: 1.3rem;
      }
    }
    .result__button {
      margin: 0;
    }
  }
`;
