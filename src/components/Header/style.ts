import styled from "styled-components";

export const HeaderContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
`;

export const InfoWrapper = styled.div`
  background-color: ${props => props.theme.colors.mainDarkBrown};
  a {
    color: ${props => props.theme.colors.white};
  }
  div {
    display: flex;
    justify-content: flex-end;
  }
  span {
    text-align: center;
    width: 100px;
    font-size: 1rem;
    margin: 0.875rem 0 0.9375rem 0;
    padding: 0 0.3125rem;
  }
  span + span {
    border-left: 1px solid white;
  }
`;

export const NavWrapper = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.colors.mainDarkBrown};
  a {
    color: ${props => props.theme.colors.mainDarkBrown};
  }
  img {
    height: 2.5375rem;
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  border-radius: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  width: 500px;
  input {
    border: none;
    background-color: ${props => props.theme.colors.mainLightBrown};
    ${props => props.theme.shadow[0]};
    border-radius: 27px;
    flex: 1;
    height: 100%;
    padding: 1rem 3rem 1rem 1.5rem;
    font-size: 1rem;
    letter-spacing: 0.09rem;
  }
  img {
    position: absolute;
    right: 0;
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    cursor: pointer;
    padding: 5px;
    box-sizing: content-box;
    border-radius: 45%;
    transition: transform 0.5s ease-in-out;
    &:hover {
      transform: scale(1.07);
      ${props => props.theme.shadow[0]};
    }
  }
`;

export const RouterWrapper = styled.div`
  display: flex;
  color: ${props => props.theme.colors.mainDarkBrown};
  span {
    cursor: pointer;
    text-align: center;
    width: 6.25rem;
    font-size: 18px;
    padding: 0px 8px;
    font-weight: bold;
    letter-spacing: -0.45px;
    padding: 0px 8px;
  }
  span + span {
    border-left: 1px solid black;
  }
`;
