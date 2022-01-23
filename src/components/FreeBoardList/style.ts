import styled from "styled-components";

const boardColor = "rgba(99, 110, 114,0.5)";

export const Wrapper = styled.div`
  margin-top: 30px;
  min-height: 500px;
`;

export const Row = styled.div`
  width: 1200px;
  & > div {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${boardColor};
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;
    cursor: pointer;
    transition: background-color 0.5s ease;

    span {
      width: 120px;
      margin: 20px 0;
      font-weight: 500;
      text-align: center;
      display: block;
      font-size: 20px;
      color: ${p => p.theme.colors.mainDarkBrown};
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:nth-child(1) {
        font-weight: bold;
      }
      &:nth-child(2) {
        flex: 1;
        transition: transform 0.5s ease;
      }
      &:nth-child(3) {
        width: 200px;
      }
      &:nth-child(5) {
        width: 250px;
      }
    }

    span + span {
      border-left: 1px solid ${boardColor};
    }

    &:not(.header) {
      &:hover {
        background-color: ${p => p.theme.colors.mainLightBrown};
      }
      & > span:nth-child(2) {
        :hover {
          transform: scale(1.02);
        }
      }
      a {
        color: #1565c0;
        display: block;
      }
    }
  }

  .header {
    background-color: ${p => p.theme.colors.mainLightBrown};
    span {
      font-weight: bold;
    }
  }
`;

export const Title = styled.h1`
  margin: 20px 0;
  font-size: 30px;
  font-weight: bold;
  color: ${p => p.theme.colors.mainDarkBrown};
`;

export const Empty = styled.div`
  min-height: 310px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 30px;
    font-weight: bold;
    color: ${p => p.theme.colors.darkGrey};
  }
`;

export const Search = styled.form`
  & > div {
    margin-top: 20px;
    justify-content: center;
    display: flex;
    gap: 20px;
  }
  input {
    width: 250px;
  }
`;
