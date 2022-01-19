import styled from "styled-components";

const bordeColor = `rgba(189, 195, 199,0.7)`;

export const Wrapper = styled.div`
  width: 1200px;
`;

export const Title = styled.h1`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: ${p => p.theme.colors.darkGrey};
  margin: 30px 0;
`;

export const List = styled.div`
  display: flex;
  gap: 20px;

  .left {
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px;
    border: 1px solid ${bordeColor};
    width: 20%;

    p {
      color: ${p => p.theme.colors.mainDarkBrown};
      font-size: 20px;
      padding: 20px 0;
      font-weight: bold;
      text-align: center;
      :hover {
        transform: scale(1.05);
      }
    }
  }
`;
