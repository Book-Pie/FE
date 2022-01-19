import StarRating from "src/components/Rating/StarRating";
import { bookInfoHeader } from "src/modules/Slices/bookDetail/types";
import {
  BookCategory,
  BookDetailHeaderWrapper,
  BookDetailImg,
  BookDetailTopContent,
  BookInfo,
  BookTitle,
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
          <StarRating ReviewRank={ReviewRank} />
        </BookInfo>
      </BookDetailTopContent>
    </BookDetailHeaderWrapper>
  );
};

export default BookDetailHeader;
