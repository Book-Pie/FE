import styled from "styled-components";

export const Wrapper = styled.div`
  width: 700px;
  margin: 30px auto;
  background-color: red;
  padding: 30px;
  border-radius: 5px;
  background-color: ${p => p.theme.colors.white};
  ${p => p.theme.shadow[10]};

  h1 {
    font-size: 35px;
    font-weight: 900;
    text-align: center;
    margin: 30px 0;
    color: ${p => p.theme.colors.darkGrey};
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
    justify-content: space-between;
  }
`;

export const Fixed = styled.div`
  position: fixed;
  background-color: rgba(189, 195, 199, 0.4);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & > div {
    background-color: ${p => p.theme.colors.white};
    ${p => p.theme.shadow[10]};
    width: 500px;
    border-radius: 5px;
    padding: 20px;
  }
  button {
    margin-top: 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  input {
    flex: 1;
  }
  & > div {
    flex: 1;
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
  }
  span {
    height: 50px;
    padding: 20px;
    display: block;
  }
`;
export const Text = styled.p`
  color: ${p => p.theme.colors.darkGrey};
  font-size: 30px;
  margin: 20px 0;
  font-weight: 900;
`;

export const Payment = styled.div`
  padding: 20px 30px;
  border: 1px solid rgba(236, 240, 241, 1);
  background-color: ${p => p.theme.colors.white};
  ${p => p.theme.shadow[10]};
  border-radius: 7px;
  margin-bottom: 20px;
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    & > span:first-child {
      color: ${p => p.theme.colors.darkGrey};
      font-size: 25px;
      font-weight: 900;
    }
    span:last-child {
      font-weight: 900;
      font-size: 18px;
      color: ${p => p.theme.colors.mainDarkBrown};
    }
  }
  div + div {
    margin-top: 25px;
  }
  & > div:last-child {
    border-top: 1px solid ${p => p.theme.colors.darkGrey};
    padding: 20px 0;
    span:last-child {
      font-weight: 900;
      color: ${p => p.theme.colors.error};
    }
  }
`;

export const Result = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  .result__title {
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: center;
    p {
      font-size: 30px;
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
    border-top: 1px solid ${p => p.theme.colors.mainLightBrown};
    padding-top: 30px;
    span {
      display: inline-block;
    }

    span:first-child {
      width: 120px;
      font-size: 25px;
      font-weight: 900;
      ${p => p.theme.colors.darkGrey};
    }
    span:last-child {
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 17px;
    }
    div {
      display: flex;
      align-items: center;
    }
    div + div {
      margin-top: 20px;
    }
  }
  .result__price {
    display: flex;
    align-items: center;
    gap: 20px;

    span:first-child {
      font-size: 45px;
    }
    span:last-child {
      font-size: 38px;
    }
  }
  .result__button {
    display: flex;
    gap: 20px;
    margin-top: 20px;
  }
`;
