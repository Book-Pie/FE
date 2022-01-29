import styled from "styled-components";

export const PointWrapper = styled.div`
  margin: 2rem 15px;

  h4 {
    text-align: center;
  }
  span {
    font-size: 15px;
  }
  span:first-child {
    font-size: 16px;
    font-weight: bold;
  }

  .info {
    color: ${({ theme }) => theme.colors.info};
  }
  .error {
    color: ${({ theme }) => theme.colors.error};
  }

  ${({ theme }) => theme.media.mobile} {
    margin: 1rem 15px;
    span {
      font-size: 15px;
    }
    span:first-child {
      font-size: 14px;
    }

    h4 {
      font-size: 25px;
    }
  } ;
`;
export const PointRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 15px;
  padding: 15px 20px;
  border: 1px solid ${({ theme }) => theme.colors.borderColors[0]};
  min-height: 150px;
  min-width: 300px;

  &.center {
    align-items: center;
    font-weight: bold;
  }

  button:disabled {
    color: ${({ theme }) => theme.colors.darkGrey};
  }
  :hover {
    background-color: ${({ theme }) => theme.colors.mainLightBrown};
  }

  & > div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
export const PointButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  button {
    width: 150px;
  }
`;

export const PointInfo = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 1rem auto;
  span {
    display: inline-block;
  }
  span:first-child {
    width: 120px;
  }

  .point {
    right: 0;
    left: 0;
    margin: 0 auto;
  }

  ${({ theme }) => theme.media.tab} {
    width: 80%;
  }
`;
