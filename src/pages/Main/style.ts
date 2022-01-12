import styled from "styled-components";

export const BookContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 200px);
  grid-template-rows: repeat(2, 200px);
  grid-auto-rows: minmax(100px, auto);
  row-gap: 20px;

  .one {
    grid-column: 1 / 3;
    grid-row: 1/3;
  }
`;

export const BookWrapper = styled.div`
  border-radius: 5px;
  cursor: pointer;
`;

export const BestSellerWrapper = styled.div`
  display: flex;
  & > div:first-child {
    width: 370px;
  }
`;
