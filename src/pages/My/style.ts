import styled from "styled-components";

const activeBorderColor = "rgba(52, 73, 94, 1)";

export const Container = styled.div`
  margin: 0 auto;
  min-width: 1200px;
`;

export const RouterWrapper = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyMenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  .my__link--active {
    background-color: ${props => props.theme.colors.white};
    border: 1px solid ${activeBorderColor};
    border-bottom: none;
    opacity: 1;
  }
  a {
    padding: 1rem;
    display: block;
    width: 100%;
    text-align: center;
    font-weight: bold;
    border: 1px solid rgba(189, 195, 199, 0.3);
    border-bottom: 1px solid ${activeBorderColor};
    background-color: ${props => props.theme.colors.mainLightBrown};
    font-weight: 900;
    opacity: 0.5;
  }

  span {
    flex: 1;
  }
`;
