import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;

  .isError {
    width: 500px;
    height: 300px;
    background-color: red;
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    font-size: 20px;
    align-items: center;
    color: ${props => props.theme.colors.mainDarkBrown};
    background-color: ${props => props.theme.colors.mainLightBrown};
    ${props => props.theme.shadow[10]};
    strong {
      color: #fee500;
      font-size: 25px;
      font-weight: 600;
    }
    .naver {
      color: rgb(12, 166, 120);
    }
  }
`;
