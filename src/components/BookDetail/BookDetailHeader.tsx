import StarRating from "components/Rating/StarRating";
import {
  BookCategory,
  BookDetailHeaderWrapper,
  BookDetailImg,
  BookDetailTopContent,
  BookInfo,
  BookTitle,
  SmallBookInfo,
} from "./style";

export interface bookInfoHeaderParam {
  author: string;
  cover: string;
  title: string;
  categoryName: string;
  publisher: string;
  ReviewRank: number;
  averageRating: number;
}

const BookDetailHeader = ({
  author,
  cover,
  title,
  categoryName,
  publisher,
  ReviewRank,
  averageRating,
}: bookInfoHeaderParam) => {
  return (
    <BookDetailHeaderWrapper>
      <BookDetailTopContent>
        <BookDetailImg src={cover} />
        <BookInfo>
          <BookCategory>{categoryName}</BookCategory>
          <BookTitle>{title}</BookTitle>
          <SmallBookInfo>{author}</SmallBookInfo>
          <SmallBookInfo>{publisher}</SmallBookInfo>
          <StarRating ReviewRank={ReviewRank} title="알라딘" />
          <br />
          <StarRating ReviewRank={averageRating} title="북파이" />
        </BookInfo>
      </BookDetailTopContent>
    </BookDetailHeaderWrapper>
  );
};

export default BookDetailHeader;
