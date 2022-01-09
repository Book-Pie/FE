import styled from "styled-components";

export const Wrapper = styled.main`
  padding: 2rem 1rem 1rem 1rem;
  margin: 2rem auto;
  background-color: ${props => props.theme.colors.mainLightBrown};
  color: ${props => props.theme.colors.mainDarkBrown};
  border-radius: 5px;
  text-align: center;
  ${props => props.theme.shadow[30]};
  & > div {
    height: 80%;
  }
  .signIn__title {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .signIn__col {
    display: flex;
    padding: 2rem 0.5rem;
    & > div {
      flex: 1;
      & > h1 {
        font-size: 2rem;
        padding: 1rem 0;
        font-weight: 900;
      }
    }
    & > div:first-child {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    & > div:last-child {
      & > img {
        margin: 0 1rem;
        width: 500px;
        height: 500px;
        border-radius: 5px;
      }
    }
  }
  .signIn__oAuth {
  }
`;

export const Oauths = styled.div`
  display: flex;
  padding: 1rem 0;
  justify-content: center;

  & > a {
    box-sizing: border-box;
    height: 50px;
    width: 200px;
    & > img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  a + a {
    padding-left: 10px;
  }
`;

export const Links = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: bold;
  a {
    padding: 0.5rem;
    color: ${props => props.theme.colors.mainDarkBrown};
  }
  span {
    font-weight: 900;
  }
  label + span {
  }

  & > div {
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
