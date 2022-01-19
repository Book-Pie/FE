import { Link } from "react-router-dom";
import { FlexColum } from "src/pages/BookDetail/style";
import styled from "styled-components";
import { BestSellerProps } from "../Main/types";
import StarRating from "../Rating/StarRating";
import { BookReviewBox, BookReviewTitle, ImageItem, ImgWrapper } from "./styles";

const BookReviewItem = ({ title, cover, customerReviewRank, isbn, isbn13 }: BestSellerProps) => {
  let ReviewRank = 0;
  if (customerReviewRank > 0) {
    ReviewRank = customerReviewRank / 2;
  } else {
    ReviewRank = 0;
  }

  return (
    <BookReviewBox>
      {isbn13 ? (
        <Link to={`/book/${isbn13}`}>
          <FlexColum>
            <ImgWrapper>
              <ImageItem src={cover} alt={title} />
            </ImgWrapper>
            <BookReviewTitle>{title}</BookReviewTitle>
            <StarRatingWrapper>
              <StarRating ReviewRank={ReviewRank} />
            </StarRatingWrapper>
          </FlexColum>
        </Link>
      ) : (
        <Link to={`/book/${isbn}`}>
          <FlexColum>
            <ImgWrapper>
              <ImageItem src={cover} alt={title} />
            </ImgWrapper>
            <BookReviewTitle>{title}</BookReviewTitle>
            <StarRatingWrapper>
              <StarRating ReviewRank={ReviewRank} />
            </StarRatingWrapper>
          </FlexColum>
        </Link>
      )}
      )
    </BookReviewBox>
  );
};

export const StarRatingWrapper = styled.div``;
export default BookReviewItem;
