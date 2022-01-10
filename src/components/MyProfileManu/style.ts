import styled from "styled-components";

const activeBorderColor = "rgba(52, 73, 94, 1)";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;

  .myProfile__title,
  .myProfile__link {
    display: flex;
    justify-content: center;
  }

  .myProfile__title {
    align-items: center;
    font-size: 3rem;
  }

  .myProfile__link--active {
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

  & > span {
    flex: 1;
  }
`;
