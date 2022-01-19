import styled from "styled-components";

export const Wrapper = styled.div`
  width: 900px;
  padding: 10px 50px 50px;
  ${p => p.theme.shadow[10]};
  border: 1px solid rgba(178, 190, 195, 0.5);

  .buyInfo__title {
    font-size: 30px;
    font-weight: bold;
    margin: 30px 0;
    color: ${p => p.theme.colors.darkGrey};
  }
  .buyInfo__top {
    & > div:nth-child(2) {
      display: flex;
      gap: 15px;
      align-items: center;
    }
  }

  .buyInfo__orderDate {
    font-size: 20px;
    font-weight: bold;
  }
  .buyInfo__orderNumber {
    font-size: 18px;
    font-weight: 600;
    color: ${p => p.theme.colors.darkGrey};
  }

  .buyInfo__seller {
    padding: 20px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid rgba(178, 190, 195, 0.5);
    display: flex;
    margin-top: 20px;
    justify-content: space-between;

    & > div:first-child {
      display: flex;
      gap: 30px;
    }
    & > div:last-child {
      display: flex;
      gap: 30px;
      justify-content: center;
      align-items: center;
      padding-left: 30px;
      border-left: 1px solid ${p => p.theme.colors.darkGrey};
      button {
        height: 50px;
      }
    }

    p:first-child {
      font-size: 25px;
      font-weight: bold;
      color: ${p => p.theme.colors.darkGrey};
      margin: 15px 0;
    }
    p:last-child {
      font-size: 18px;
      color: ${p => p.theme.colors.mainDarkBrown};
      width: 350px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .buyInfo__bookImg {
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 150px;
      height: 100%;
    }
  }

  .buyInfo__buyer {
    padding: 20px 0;
    border-top: 3px solid ${p => p.theme.colors.darkGrey};
    border-bottom: 1px solid ${p => p.theme.colors.darkGrey};

    span:first-child {
      width: 150px;
      font-size: 20px;
      font-weight: bold;
      color: ${p => p.theme.colors.darkGrey};
    }
    p:last-child {
      font-size: 15px;
      font-weight: bold;
      color: ${p => p.theme.colors.mainDarkBrown};
      width: 550px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    & > div {
      margin-top: 15px;
      display: flex;
      align-items: center;
    }
    & > div:first-child {
      margin-top: 0;
    }
  }

  .buyInfo__paymentInfo {
    border-top: 3px solid ${p => p.theme.colors.darkGrey};
    & > div {
      display: flex;
      border-bottom: 1px solid rgba(178, 190, 195, 1);
    }
    & > div > div:first-child {
      flex: 7;
      background-color: white;
      padding: 0 15px;
    }
    & > div > div:last-child {
      background-color: rgba(178, 190, 195, 0.3);
      padding: 0 15px;
      flex: 3;
      & > div {
        display: flex;
        justify-content: space-between;
      }
    }
    p {
      padding: 15px 0;
      font-weight: bold;
    }
    p:first-child {
      font-weight: bold;
      font-size: 18px;
      color: ${p => p.theme.colors.darkGrey};
    }
  }
`;

export const Empty = styled.div`
  min-height: 100vh;
`;
