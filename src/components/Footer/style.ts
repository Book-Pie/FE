import styled from "styled-components";

export const FooterContainer = styled.footer`
  margin: 2rem 0 0 0;
  background-color: ${({ theme }) => theme.colors.mainLightBrown};

  ${({ theme }) => theme.media.mobile} {
    margin: 0 0 0 0;
  }
`;

export const FooterWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.5rem;
  padding-top: 3rem;
  padding-bottom: 5rem;
  min-width: 375px;

  & > div {
    flex: 1;
  }

  & > div + div {
    border-left: 2px solid #3e3e3e;
  }

  & > div:first-child {
    img {
      width: 100%;
      max-width: 200px;
      height: 57px;
    }
    div + div {
      margin-top: 1rem;
    }
    p {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.57;
      letter-spacing: -0.56px;
      color: ${({ theme }) => theme.colors.darkGrey};
    }
    p + p {
      margin: 0.4rem 3rem 0.2rem 0;
    }
  }
  & > div:nth-child(2) {
    & > div {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      & > div {
        width: 70%;
      }
      & > div:first-child > p:last-child {
        font-size: 50px;
      }
      & > div:last-child > p:first-child {
        font-size: 15px;
      }
      & > div:last-child > p:last-child {
        font-size: 15px;
        font-weight: normal;
      }
    }
    p {
      color: ${({ theme }) => theme.colors.mainDarkBrown};
      font-weight: 900;
      font-size: 20px;
    }
    p + p {
      margin-top: 8px;
    }
  }
  & > div:nth-child(3) {
    & > div + div {
      margin-top: 20px;
    }
    p {
      padding-left: 30px;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
      font-weight: 900;
      font-size: 20px;
    }
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 3rem;
    & > div + div {
      border-left: 5px solid #3e3e3e;
    }
    & > div:nth-child(2) {
      & > div {
        display: block;
        padding-left: 30px;
        div {
          width: 100%;
        }
        div + div {
          margin-top: 1rem;
        }
      }
    }
  }
`;
