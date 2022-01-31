import { Link } from "react-router-dom";
import { BookItemProps } from "modules/Slices/book/types";
import StarRating from "../Rating/StarRating";
import { BookReviewBox, BookReviewTitle, ImageItem, ImgWrapper } from "./styles";
import { BookRatingContent } from "../BookDetail/style";

export interface BookReviewItemParam {
  card: BookItemProps;
}

const BookReviewItem = ({ card }: BookReviewItemParam) => {
  const { customerReviewRank, cover, isbn, isbn13, title } = card;
  let ReviewRank = 0;
  if (customerReviewRank > 0) {
    ReviewRank = customerReviewRank / 2;
  } else {
    ReviewRank = 0;
  }

  return (
    <BookReviewBox>
      {isbn13 ? (
        <Link to={`/book/category/${isbn13}`}>
          <ImgWrapper>
            <ImageItem src={cover} alt={title} />
          </ImgWrapper>
          <BookReviewTitle>{title}</BookReviewTitle>
          <BookRatingContent>
            <StarRating ReviewRank={ReviewRank} />
          </BookRatingContent>
        </Link>
      ) : (
        <Link to={`/book/category/${isbn}`}>
          <ImgWrapper>
            <ImageItem src={cover} alt={title} />
          </ImgWrapper>
          <BookReviewTitle>{title}</BookReviewTitle>
          <BookRatingContent>
            <StarRating ReviewRank={ReviewRank} />
          </BookRatingContent>
        </Link>
      )}
    </BookReviewBox>
  );
};

export default BookReviewItem;
