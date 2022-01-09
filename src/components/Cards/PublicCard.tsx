import BasicCard from "./BasicCard";
import {
  Container,
  BookTitle,
  BookCategory,
  AuthorName,
  SmallBookCard,
  SideBarImg,
  SmallImg,
  CardTitle,
  CardContent,
} from "./style";
import { CardProps } from "./types";

function Card({
  bookThumnail,
  bookName,
  bookCategory,
  authorName,
  bookIntroTitle,
  bookIntroText,
  authorIntroTitle,
  authorIntroText,
  anotherBooks,
  smallImage,
}: CardProps) {
  return (
    <BasicCard>
      <SideBarImg src={bookThumnail} />
      <BookTitle>{bookName}</BookTitle>
      <Container>
        <BookCategory>{bookCategory}</BookCategory>
        <AuthorName>{authorName}</AuthorName>
      </Container>
      <CardTitle>{bookIntroTitle || authorIntroTitle}</CardTitle>
      <CardContent>{bookIntroText || authorIntroText}</CardContent>
      <SmallBookCard>
        <CardTitle>{anotherBooks}</CardTitle>
        <SmallImg src={smallImage} />
      </SmallBookCard>
    </BasicCard>
  );
}

export default Card;
