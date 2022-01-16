import Rating from "@mui/material/Rating";
import { bookInfoHeader } from "src/modules/Slices/bookDetail/types";
import {
  BookCategory,
  BookDetailHeaderWrapper,
  BookDetailImg,
  BookDetailTopContent,
  BookInfo,
  BookRatingContent,
  BookTitle,
  RatingContent,
  RatingScore,
  SmallBookInfo,
} from "./style";

const BookDetailHeader = ({ author, cover, title, categoryName, publisher, ReviewRank }: bookInfoHeader) => {
  return (
    <BookDetailHeaderWrapper>
      <BookDetailTopContent>
        <BookDetailImg src={cover} />
        <BookInfo>
          <BookCategory>{categoryName}</BookCategory>
          <BookTitle>{title}</BookTitle>
          <SmallBookInfo>{author}</SmallBookInfo>
          <SmallBookInfo>{publisher}</SmallBookInfo>
          <BookRatingContent>
            <RatingContent>알라딘 평균</RatingContent>
            <RatingContent>
              <Rating name="read-only" precision={0.5} value={ReviewRank} size="small" readOnly />
              <RatingScore>({ReviewRank})점</RatingScore>
            </RatingContent>
          </BookRatingContent>
        </BookInfo>
      </BookDetailTopContent>
    </BookDetailHeaderWrapper>
  );
};

export default BookDetailHeader;
