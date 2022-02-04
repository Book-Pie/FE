import styled, { css } from "styled-components";

export const HeaderContainer = styled.header`
  max-width: 1200px;
  margin: 0 auto;
  line-height: 1.5;
`;

export const InfoWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: ${({ theme }) => theme.colors.mainDarkBrown};
  a {
    color: ${({ theme }) => theme.colors.white};
  }
  span {
    display: inline-block;
    text-align: center;
    width: 100px;
    font-size: 1rem;
    margin: 0.875rem 0 0.9375rem 0;
    padding: 0 0.3125rem;
  }
  span + span {
    border-left: 1px solid ${({ theme }) => theme.colors.white};
  }
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;

export const HamburgerWrapper = styled.div<{ isVisible: boolean }>`
  display: none;
  background-color: ${({ theme }) => theme.colors.mainDarkBrown};

  svg {
    cursor: pointer;
    margin: 0.5rem;
    color: ${({ theme }) => theme.colors.white};
  }
  span {
    display: inline-block;
  }
  ul {
    height: 0;
    overflow: hidden;
    transition: height 0.5s ease-in;
    ${({ isVisible }) =>
      isVisible &&
      css`
        height: 150px;
      `}
  }

  a {
    display: block;
    padding: 20px 15px;
    height: 75px;
    color: ${({ theme }) => theme.colors.white};
    :hover {
      background-color: ${({ theme }) => theme.colors.mainLightBrown};
      color: ${({ theme }) => theme.colors.darkGrey};
      font-weight: bold;
    }
  }
  ${({ theme }) => theme.media.mobile} {
    display: block;
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
    max-height: 2.5375rem;
    width: 100%;
  }
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    height: auto;
    padding: 1rem 0.5rem;
  }
`;

export const SearchWrapper = styled.form`
  position: relative;
  border-radius: 27px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 54px;
  flex: 1;
  max-width: 500px;

  input {
    margin: 0 1rem;
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
    right: 5%;
    width: 20px;
    height: 20px;
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
  & > div {
    position: absolute;
    top: 115%;
    z-index: 3;
    left: 0;
    right: 0;
    ${props => props.theme.shadow[0]};
  }
  ${({ theme }) => theme.media.mobile} {
    flex: none;
    input {
      margin: 0;
      width: 100%;
    }
  }
`;

export const RouterWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.mainDarkBrown};
  span {
    cursor: pointer;
    text-align: center;
    width: 6.25rem;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.45px;
  }

  span + span {
    border-left: 1px solid ${({ theme }) => theme.colors.mainDarkBrown};
  }
  a {
    padding: 0.8rem;
  }

  span:last-child {
    position: relative;
    :hover {
      ul {
        opacity: 1;
        transform: translateY(0%);
        z-index: 3;
      }
    }

    ul {
      transition: opacity 0.4s ease-in;
      transition: z-index 0.4s ease-in;
      transition: transform 0.2s ease-in;
      transform: translateY(10%);
      z-index: -1;
      background-color: white;
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 150px;
      right: 0;
      opacity: 0;
      ${({ theme }) => theme.shadow[0]};
      border-radius: 2px;
    }

    li {
      a {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 15px;
        color: ${({ theme }) => theme.colors.mainDarkBrown};
        :hover {
          background-color: ${({ theme }) => theme.colors.mainLightBrown};
        }
      }
    }

    li + li {
      border-top: 1px solid rgba(99, 110, 114, 0.2);
    }
  }

  ${({ theme }) => theme.media.mobile} {
    padding-top: 1rem;
    span {
      width: 5.25rem;
    }
  }
`;
