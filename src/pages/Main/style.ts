import styled from "styled-components";

export const TextWrapper = styled.div`
  /* width: 1600px; */
`;

export const BookListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BookContainer = styled.div`
  /* width: 1600px; */
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 250px);
  column-gap: 20px;
  row-gap: 20px;
  :nth-child(1) {
    grid-row-start: 2;
    grid-column-end: span 3;
  }
`;

export const BookWrapper = styled.div`
  width: 250px;
  height: 250px;
  :nth-child(1) {
    width: 520px;
    height: 520px;
    grid-row-start: 1;
    grid-row-end: span 2;
    grid-column-end: span 2;
    img {
      height: 480px;
    }
  }
`;

export const BannerImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 100%;
  width: 100%;
`;
