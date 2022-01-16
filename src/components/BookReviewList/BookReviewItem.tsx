import { Link } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import { FlexColum } from "src/pages/BookDetail/style";
import styled from "styled-components";
import { BestSellerProps } from "../Main/types";
import StarRating from "../Rating/StarRating";
import { BookReviewBox, BookReviewTitle, ImageItem, ImgWrapper } from "./styles";

const BookReviewItem = ({ title, cover, isbn13, customerReviewRank, isbn }: BestSellerProps) => {
  const { signIn } = useSignIn();
  const { user } = signIn;

  let ReviewRank = 0;
  if (customerReviewRank > 0) {
    ReviewRank = customerReviewRank / 2;
  } else {
    ReviewRank = 0;
  }

  if (user !== null) {
    const { id } = user;
    return (
      <BookReviewBox>
        <Link to={`/book/${isbn}/userId=${id}`}>
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
      </BookReviewBox>
    );
  }

  return (
    <BookReviewBox>
      <Link to={`/book/${isbn13}`}>
        <FlexColum>
          <ImgWrapper>
            <ImageItem src={cover} alt={title} />
          </ImgWrapper>
          <BookReviewTitle>{title}</BookReviewTitle>
          <StarRating ReviewRank={customerReviewRank} />
        </FlexColum>
      </Link>
    </BookReviewBox>
  );
};

export const StarRatingWrapper = styled.div``;
export default BookReviewItem;
