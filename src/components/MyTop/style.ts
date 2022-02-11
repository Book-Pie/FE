import styled from "styled-components";

export const MyTopWrapper = styled.section`
  display: flex;
  gap: 1rem;
  margin: 0 1rem;

  & > div:first-child {
    flex: 5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:last-child {
    flex: 5;
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

export const ProfileImg = styled.div`
  flex: 6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;

  img {
    border-radius: 50%;
    height: 200px;
    width: 200px;
    ${({ theme }) => theme.shadow[0]};
  }
`;

export const NoneProfileImg = styled(ProfileImg)`
  img {
    padding: 30px;
  }
`;

export const MyTopPointInfo = styled.div`
  position: relative;
  cursor: pointer;
  &:hover > .point {
    visibility: visible;
    opacity: 1;
    transform: translateY(0%);
  }

  .point {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    visibility: hidden;
    position: absolute;
    width: 450px;
    padding: 1rem 1rem 1rem 2rem;
    gap: 1rem;
    top: 100%;
    background-color: ${p => p.theme.colors.white};
    z-index: 1;
    left: -50%;
    transition: all 0.5s ease-in-out;
    opacity: 0;
    transform: translateY(-50%);
    border-radius: 5px;
    ${p => p.theme.shadow[0]};
    color: ${p => p.theme.colors.darkGrey};

    div {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 0.7rem;
    }

    .bronze,
    .silver,
    .gold {
      display: inline-block;
      font-size: 25px;
      text-align: center;
    }
    .bronze {
      color: #624637;
    }
    .silver {
      color: #c0c0c0;
    }
    .gold {
      color: #ffd700;
    }
    p {
      font-size: 20px;
      font-weight: 900;
    }

    span:first-child {
      font-weight: 600;
      text-align: center;
      width: 130px;
    }
    span:last-child {
      color: ${p => p.theme.colors.info};
    }
  }

  ${({ theme }) => theme.media.mobile} {
    .point {
      padding: 1rem 0.7rem;
      gap: 0.5rem;
      width: 100%;
      left: 0;
      right: 0;

      div {
        flex-direction: column;
      }
    }
  }
`;

export const MyTopUserInfo = styled.div`
  flex: 6;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 5px;
  ${({ theme }) => theme.shadow[0]};
  background-color: ${({ theme }) => theme.colors.mainLightBrown};
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

export const MyChartWrapper = styled.div`
  width: 300px;
  height: 300px;
`;

export const TitleSpan = styled.span`
  margin: 0 10px 0 20px;
  font-size: 18px;
  font-weight: 600;
  color: #787878;
`;

export const EmptyChart = styled.div`
  display: flex;
  height: 300px;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;

  div {
    flex-direction: column;
  }

  p {
    margin-bottom: 5px;
  }
`;
