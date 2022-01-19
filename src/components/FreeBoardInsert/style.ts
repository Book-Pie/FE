import styled from "styled-components";

export const EditorWrapper = styled.div`
  span {
    width: 150px;
  }
  strong {
    color: red;
  }

  & > div + div {
    margin-top: 10px;
    padding-top: 10px;
    border-top: 1px solid rgba(189, 195, 199, 0.5);
  }

  & > div {
    display: flex;
    align-items: center;

    & > div:last-child {
      flex: 1;

      & > div + div {
        margin-top: 10px;
      }
    }
    & > span:first-child {
      padding-left: 20px;
      font-size: 20px;
      font-weight: 900;
    }
  }
`;

export const Title = styled.div`
  margin: 20px 0;
  display: flex;
  gap: 20px;
  span {
    font-size: 23px;
    font-weight: 900;
    &:last-child {
      color: ${p => p.theme.colors.mainDarkBrown};
    }
    &:first-child {
      padding-left: 20px;
      border-left: 5px solid ${p => p.theme.colors.mainDarkBrown};
    }
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  button {
    height: 50px;
    width: 100px;
  }
`;
