import styled from "styled-components";

const boardColor = "rgba(99, 110, 114,0.5)";

export const Wrapper = styled.div`
  margin-top: 30px;
  min-height: 300px;
`;

export const Header = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${boardColor};
  border-top: 1px solid ${boardColor};
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;
  background-color: ${p => p.theme.colors.mainLightBrown};

  span {
    width: 100px;
    margin: 15px 0;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    color: ${p => p.theme.colors.darkGrey};

    &:nth-child(2) {
      flex: 1;
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
`;

export const Row = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
  margin: 5px 0;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;
  height: 50px;
  cursor: pointer;
  transition: background-color 0.5s ease;
  :hover {
    background-color: ${p => p.theme.colors.mainLightBrown};
  }

  a {
    color: #1565c0;
    display: block;
  }
  span {
    width: 100px;
    margin: 20px 0;
    font-weight: 500;
    text-align: center;
    display: block;
    font-size: 20px;
    color: ${p => p.theme.colors.mainDarkBrown};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 0 20px;
    &:nth-child(1) {
      font-weight: bold;
    }
    &:nth-child(2) {
      flex: 1;
      transition: transform 0.5s ease;
      :hover {
        transform: scale(1.02);
      }
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
`;

export const Title = styled.h1`
  margin: 20px 0;
  font-size: 30px;
  font-weight: bold;
  color: ${p => p.theme.colors.mainDarkBrown};
`;

export const Empty = styled.div`
  min-height: 100vh;
`;
