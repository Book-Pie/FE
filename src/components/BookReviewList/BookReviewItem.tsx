import { Link } from "react-router-dom";
import useSignIn from "src/hooks/useSignIn";
import { FlexColum } from "src/pages/BookDetail/style";
import { BestSellerProps } from "../Main/types";
import { BookReviewBox, BookReviewTitle, ImageItem, ImgWrapper } from "./styles";

const BookReviewItem = ({ title, cover, isbn13 }: BestSellerProps) => {
  const { signIn } = useSignIn();
  const { user } = signIn;

  if (user !== null) {
    const { id } = user;
    return (
      <BookReviewBox>
        <Link to={`/book/${isbn13}/userId=${id}`}>
          <FlexColum>
            <ImgWrapper>
              <ImageItem src={cover} alt={title} />
            </ImgWrapper>
            <BookReviewTitle>{title}</BookReviewTitle>
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
        </FlexColum>
      </Link>
    </BookReviewBox>
  );
};
export default BookReviewItem;
