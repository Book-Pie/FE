import styled from "styled-components";

const boardColor = "rgba(99, 110, 114,0.5)";

export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${p => p.theme.colors.darkGrey};
  margin: 30px 0 10px 0;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0 10px 0;
  border-bottom: 1px solid ${boardColor};
  a {
    color: ${p => p.theme.colors.white};
  }

  span {
    color: ${p => p.theme.colors.darkGrey};
    font-size: 18px;
    padding: 0 10px;
    &:first-child {
      padding-left: 0;
      font-weight: 900;
    }
  }
  span + span {
    border-left: 1px solid ${boardColor};
  }

  & > div {
    &:first-child {
      flex: 6;

      &:first-child {
        font-size: 25px;
      }
      & > div + div {
        margin-top: 10px;
      }
    }
    &:last-child {
      flex: 4;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
`;

export const Main = styled.div`
  min-height: 400px;
  padding: 20px;
  border-bottom: 1px solid ${boardColor};
`;

export const Empty = styled.div`
  min-height: 100vh;
`;
