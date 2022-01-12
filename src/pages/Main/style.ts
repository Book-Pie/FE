import styled from "styled-components";

export const BookContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: repeat(3, 300px);
  grid-auto-rows: minmax(100px, auto);
  row-gap: 15px;
`;

export const BookWrapper = styled.div`
  border-radius: 5px;
  cursor: pointer;
`;
