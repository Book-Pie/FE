import styled from "styled-components";

export const BookItemWrapper = styled.div`
  border-radius: 5px;
  cursor: pointer;
  margin: 20px;
`;

export const BookReviewListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  row-gap: 20px;
`;

export const Text = styled.p`
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin: 50px 0px 22px 0px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(99, 110, 114, 0.1);
`;

export const Wrapper = styled.div``;
