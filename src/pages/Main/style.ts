import styled from "styled-components";

export const BookItemWrapper = styled.div`
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
`;

export const BookReviewListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  grid-template-rows: repeat(2, 230px);
  grid-auto-rows: minmax(100px, auto);
  row-gap: 20px;

  .one {
    grid-column: 1 / 3;
    grid-row: 1/3;
  }
`;

export const BookContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 200px);
  grid-template-rows: repeat(2, 200px);
  grid-auto-rows: minmax(100px, auto);
  row-gap: 40px;

  .one {
    grid-column: 1 / 3;
    grid-row: 1/3;
  }
`;

export const BookWrapper = styled.div`
  border-radius: 5px;
  cursor: pointer;
`;

export const MainBannerWrapper = styled.div`
  height: 380px;
`;

export const Text = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin: 50px 0px 42px 0px;
`;
