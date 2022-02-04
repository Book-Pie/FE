import styled from "styled-components";

export const SaleInfoWrapper = styled.div`
  padding: 10px 50px;
  margin: 2rem 0;
  width: 90%;
  ${({ theme }) => theme.shadow[0]};

  .saleInfo__title {
    font-size: 1.8rem;
    margin: 1.5rem 0;
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  .saleInfo__top {
    .saleInfo__title {
      color: ${({ theme }) => theme.colors.info};
      font-size: 2.2rem;
      font-weight: bold;
    }
    & > div:nth-child(2) {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .saleInfo__orderDate {
    font-size: 1rem;
  }
  .saleInfo__orderNumber {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.info};
  }

  .saleInfo__seller {
    padding: 1rem;
    border-radius: 5px;
    background-color: white;
    border: 1px solid rgba(178, 190, 195, 0.5);
    display: flex;
    margin-top: 1.2rem;
    justify-content: space-between;

    & > div:last-child {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      button {
        height: 50px;
      }
      & > div > div {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        margin: 0.5rem 0;
      }
    }

    p:first-child {
      width: 100px;
      font-size: 1.4rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
    }
    p:last-child {
      font-size: 1rem;
      max-width: 200px;
      color: ${({ theme }) => theme.colors.info};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .saleInfo__bookImg {
    width: 100%;
    max-width: 150px;
    max-height: 150px;
  }

  .saleInfo__buyer {
    padding: 1.1rem 0;
    border-top: 3px solid ${({ theme }) => theme.colors.darkGrey};
    border-bottom: 1px solid ${({ theme }) => theme.colors.darkGrey};

    span:first-child {
      min-width: 120px;
      display: block;
      font-size: 1.1rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
    p:last-child {
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
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

  .saleInfo__paymentInfo {
    border-top: 3px solid ${({ theme }) => theme.colors.darkGrey};
    & > div {
      display: flex;
      border-bottom: 1px solid rgba(178, 190, 195, 1);
      & > div:first-child {
        flex: 7;
        background-color: white;
        padding: 12px;
      }
      & > div:last-child {
        background-color: rgba(178, 190, 195, 0.3);
        padding: 12px;
        flex: 3;
        & > div {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
        }
      }
    }
    p {
      padding: 10px 0;
      font-weight: 500;
    }
    p:first-child {
      font-weight: bold;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
  }
  ${({ theme }) => theme.media.mobile} {
    padding: 10px 25px;
    width: 100%;
    margin: 0;
    box-shadow: none;
    .saleInfo__title {
      font-size: 1rem;
      margin: 1rem 0;
    }

    .saleInfo__top {
      .saleInfo__title {
        font-size: 1.5rem;
      }
      .saleInfo__orderNumber,
      .saleInfo__orderDate {
        font-size: 0.8rem;
      }
    }
    .saleInfo__seller {
      padding: 0.4rem;
      margin: 0;
      p:first-child {
        font-size: 0.7rem;
      }
      p:last-child {
        font-size: 0.6rem;
      }
    }
    .saleInfo__buyer {
      padding: 20px 0;
      span:first-child {
        font-size: 0.7rem;
      }
      p:last-child {
        font-size: 0.6rem;
      }
      & > div {
        gap: 10px;
      }
    }

    .saleInfo__paymentInfo {
      font-size: 15px;
      font-weight: 100;

      & > div > div:first-child {
        flex: 4;
        padding: 10px;
      }
      & > div > div:last-child {
        flex: 6;
        padding: 10px;
      }
      p {
        padding: 10px 0;
      }
      p:first-child {
        font-size: 18px;
      }
    }
  }
`;
