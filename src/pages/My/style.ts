import styled from "styled-components";

const activeBorderColor = "rgba(52, 73, 94, 1)";

export const MyContainer = styled.main`
  margin: 2rem 0;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 0rem;
    margin: 0;
  }
`;

export const MyMenuTabWrapper = styled.section`
  margin-top: 1rem;

  .active {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.darkGrey};
    border: 1px solid ${activeBorderColor};
    border-bottom: none;
    opacity: 1;
    font-weight: bold;
  }
  a {
    padding: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid rgba(189, 195, 199, 0.4);
    border-bottom: 1px solid ${activeBorderColor};
    background-color: ${({ theme }) => theme.colors.mainLightBrown};
    opacity: 0.5;
    text-align: center;

    @media screen and (max-width: 900px) {
      height: 50px;
      width: 150px;
    }
    ${({ theme }) => theme.media.mobile} {
      font-size: 0.6rem;
    }
    :hover {
      opacity: 1;
      color: ${({ theme }) => theme.colors.mainDarkBrown};
    }
  }
  & .MuiTabs-root {
    position: relative;
    overflow: visible;
    width: 100%;
  }

  @media screen and (max-width: 900px) {
    & .MuiTabs-flexContainer {
      display: block;
    }
  }
  & .MuiButtonBase-root {
    padding: 0;
    flex: 1;
  }
  & .MuiTabScrollButton-root {
    position: absolute;
    z-index: 5;
    top: 100%;
    padding: 10px;
  }
  & .MuiTabScrollButton-root:first-child {
    left: 0;
  }
  & .MuiTabScrollButton-root:last-child {
    right: 0;
  }
`;

export const MyRouterWrapper = styled.section`
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.media.mobile} {
    min-height: 200px;
  }
`;
