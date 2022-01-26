import styled from "styled-components";

export const SignInContainer = styled.main`
  padding: 2rem 2rem 1rem 2rem;
  margin: 2rem auto 0 auto;
  background-color: ${p => p.theme.colors.mainLightBrown};
  color: ${p => p.theme.colors.mainDarkBrown};
  border-radius: 5px;
  text-align: center;
  min-width: 375px;
  ${p => p.theme.shadow[0]};

  & > div:nth-child(2) {
    display: flex;
    padding: 2rem 0;
  }

  ${p => p.theme.media.mobile} {
    padding: 2rem 1rem 1rem 1rem;
    & > div:nth-child(2) {
      padding: 1rem 0;
    }
  }
`;

export const TitleImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    font-size: 2rem;
    margin: 1rem 0;
    font-weight: 900;
    color: ${p => p.theme.colors.darkGrey};
  }
  ${p => p.theme.media.mobile} {
  }
`;

export const Right = styled.div`
  flex: 1;
  margin-left: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    max-height: 500px;
    border-radius: 5px;
  }
  ${p => p.theme.media.mobile} {
    display: none;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const Links = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  a {
    padding-top: 0.5rem;
    padding-bottom: 0;
    margin: 0 0.5rem;
    color: ${props => props.theme.colors.info};
    :hover {
      border-bottom: 1px solid ${props => props.theme.colors.info};
    }
  }
  span {
    font-size: 0.9rem;
  }
  p {
    font-weight: bold;
  }

  & > div {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${p => p.theme.media.mobile} {
    & > div {
      flex-direction: column;
      gap: 0.7rem;
      padding: 0.5rem 0;
    }
  }
`;

export const Oauths = styled.div`
  display: flex;
  padding: 1rem 0;
  justify-content: center;

  a {
    box-sizing: border-box;
    height: 70px;
    transition: opacity 0.5s ease-in;
    img {
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
    :hover {
      opacity: 0.6;
    }
  }
  a + a {
    margin-left: 10px;
  }

  ${p => p.theme.media.mobile} {
    flex-direction: column;
    a {
      height: 90px;
    }
    a + a {
      margin-left: 0px;
      margin-top: 1rem;
    }
  }
`;
