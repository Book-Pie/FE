import { Link } from "react-router-dom";
import { FlexColum } from "src/pages/BookDetail/style";
import styled from "styled-components";
import { BestSellerProps } from "../Main/types";

const BookReviewItem = ({ title, cover, isbn13 }: BestSellerProps) => {
  return (
    <BookReviewBox>
      <Link to={`/book/${isbn13}`}>
        <FlexColum>
          <ImgWrapper>
            <ImageItem src={cover} alt={title} />
          </ImgWrapper>
          <BookReviewTitle>{title}</BookReviewTitle>
        </FlexColum>
      </Link>
    </BookReviewBox>
  );
};

export const BookReviewTitle = styled.div`
  color: #40474d;
`;

export const BookReviewBox = styled.div`
  border-radius: 5px;
  background-color: #f2f2f2;
  width: 180px;
  height: 200px;
  margin: 20px;
`;

export const ImgWrapper = styled.div``;

export const ImageItem = styled.img`
  height: 140px;
  width: 100px;
  margin: 0 50px 0 45px;
`;

export default BookReviewItem;
