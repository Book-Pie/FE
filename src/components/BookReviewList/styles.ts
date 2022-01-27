import styled from "styled-components";

export const BookReviewListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  row-gap: 20px;
`;

export const BookReviewContainer = styled.div`
  display: grid;
  justify-content: center;
  margin: 0 auto;
  min-height: 1200px;
`;

export const ReviewListSkeletonRow = styled.div`
  margin-top: 1.5rem;
  display: flex;
  &:first-child {
    margin-top: 0;
  }
`;

export const BookReviewTitle = styled.div`
  height: 23px;
  color: #40474d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px 5px 10px 10px;
  font-weight: 500;
  margin-bottom: 5px;
`;

export const BookReviewBox = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 230px;
  height: 200px;
  margin: 20px;
`;

export const ReviewListWrapper = styled.div`
  margin-top: 50px;
`;

export const ImgWrapper = styled.div``;

export const ImageItem = styled.img`
  height: 140px;
  width: 100px;
  margin: 0 60px 0 65px;
`;

export const Text = styled.p`
  padding-left: 30px;
  font-size: 30px;
  font-weight: bold;
  color: ${props => props.theme.colors.mainDarkBrown};
  margin: 50px 0px 22px 0px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(99, 110, 114, 0.1);
`;

export const Wrapper = styled.div``;
