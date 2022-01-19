import styled from "styled-components";

const boardColor = "rgba(99, 110, 114,0.5)";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  color: ${p => p.theme.colors.darkGrey};
  margin: 30px 0 10px 0;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
  width: 1200px;
  padding: 20px 0 10px 0;
  border-bottom: 2px solid ${p => p.theme.colors.darkGrey};
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

  & > div :first-child {
    flex: 6;

    &:first-child {
      font-size: 35px;
    }
    & > div + div {
      margin-top: 10px;
    }
  }

  & > div:last-child {
    flex: 4;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
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
