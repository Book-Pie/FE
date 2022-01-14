import styled from "styled-components";

export const FooterContainer = styled.footer`
  margin: 151px 0 0;
  background-color: ${props => props.theme.colors.mainLightBrown};
  & > div:first-child {
    margin: 0 auto;
    width: 1200px;
    display: flex;

    & > div {
      width: 400px;
      margin-top: 61px;
      margin-bottom: 120px;
    }

    & > div + div {
      border-left: 2px solid #3e3e3e;
    }

    & > div:first-child {
      img {
        width: 200px;
        height: 57px;
      }
      div + div {
        margin-top: 22px;
      }
      p {
        font-size: 14px;
        font-weight: 500;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.57;
        letter-spacing: -0.56px;
        text-align: left;
        color: #3e3e3e;
      }
      p + p {
        margin: 6px 80.5px 3px 0;
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
        color: ${props => props.theme.colors.mainDarkBrown};
        font-weight: 900;
        font-size: 20px;
      }
      p + p {
        margin-top: 8px;
      }
    }
    & > div:nth-child(3) {
      padding-left: 30px;
      & > div + div {
        margin-top: 20px;
      }
      p {
        color: ${props => props.theme.colors.mainDarkBrown};
        font-weight: 900;
        font-size: 20px;
      }
    }
  }
`;
