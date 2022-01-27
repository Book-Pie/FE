import { Link } from "react-router-dom";
import { BookItemProps } from "src/modules/Slices/book/types";
import StarRating from "../Rating/StarRating";
import { BookReviewBox, BookReviewTitle, ImageItem, ImgWrapper } from "./styles";

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
        <Link to={`/book/${isbn13}`}>
          <ImgWrapper>
            <ImageItem src={cover} alt={title} />
          </ImgWrapper>
          <BookReviewTitle>{title}</BookReviewTitle>
          <div>
            <StarRating ReviewRank={ReviewRank} />
          </div>
        </Link>
      ) : (
        <Link to={`/book/${isbn}`}>
          <ImgWrapper>
            <ImageItem src={cover} alt={title} />
          </ImgWrapper>
          <BookReviewTitle>{title}</BookReviewTitle>
          <div>
            <StarRating ReviewRank={ReviewRank} />
          </div>
        </Link>
      )}
    </BookReviewBox>
  );
};

export default BookReviewItem;
