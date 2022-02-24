import styled from "styled-components";

export const ShopTopWrapper = styled.section`
  display: flex;
  gap: 1rem;
  margin: 0 1rem;

  & > div:first-child {
    flex: 7;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:last-child {
    flex: 7;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 0;
    padding: 0 0.5rem;
    & > div:first-child {
      flex-direction: column;
    }
  } ;
`;

export const ShopTopUserInfo = styled.div`
  flex: 6;
  padding: 1rem;
  padding-top: 6rem;
  width: 50%;
  padding: 1rem;
  background-color: #f8f8f8;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 30%) 0px 0px 5px;
  margin-top: 10px;

  flex-direction: column;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.mainDarkBrown};

  a {
    display: block;
    flex: 1;
  }

  & > form,
  & > div {
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;

    & > span:first-child {
      font-size: 1.2rem;
      color: ${({ theme }) => theme.colors.darkGrey};
      font-weight: 500;
    }
    & > span:nth-child(2) {
      color: ${({ theme }) => theme.colors.info};
      font-size: 1rem;
    }
  }

  button:first-child {
    width: 100%;
  }

  button:nth-child(2) {
    width: 110px;
    transition: opacity 0.25s ease-in;
    :hover {
      opacity: 0.8;
    }
  }
  .errorMessage {
    padding: 0.2rem 1rem;
    & > span:first-child {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.white};
    }
  }
  .skeleton {
    height: auto;
  }

  @media screen and (max-width: 900px) {
    padding: 1rem;
    display: flex;
    justify-content: center;
    background-color: #f8f8f8;
    border-radius: 5px;
    box-shadow: rgb(0 0 0 / 30%) 0px 0px 5px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 1.1rem 0.7rem;
    width: 100%;
    & > form,
    & > div {
      span:first-child {
        font-size: 0.8rem;
      }
      span:nth-child(2) {
        font-size: 0.7rem;
      }
    }
    button {
      font-size: 0.6rem;
    }

    .errorMessage {
      padding: 0.5rem;
      height: 50px;
      & > span:first-child {
        font-size: 0.8rem;
        color: ${({ theme }) => theme.colors.white};
      }
    }
  } ;
`;

export const FollowButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const ImgWrapper = styled.div`
  flex-direction: column;
`;

export const ShopFollowButtonArea = styled.div<{ margin?: number }>`
  margin-left: ${props => (props.margin === 20 ? 0 : 0.5)}rem;
`;

export const ShopTopUserInfoWrapper = styled.div`
  width: 20rem;
  display: flex;
  justify-content: center;
  padding-top: 6rem;

  @media screen and (max-width: 900px) {
    display: flex;
    justify-content: center;
    width: 70%;
    padding-top: 0;
  }
`;

export const ShopTopUserInfoCenterWrapper = styled.div`
  @media screen and (max-width: 900px) {
    display: flex;
    justify-content: center;
  }
`;

export const ShopTopProfileWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
