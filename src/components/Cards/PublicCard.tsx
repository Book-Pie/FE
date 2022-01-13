import BasicCard from "./BasicCard";
import { Container, BookTitle, BookCategory, SideBarImg, CardTitle, CardContent, SmallBookInfo } from "./style";
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
  publisher,
}: CardProps) {
  return (
    <BasicCard>
      <BookCategory>{bookCategory}</BookCategory>
      <SideBarImg src={bookThumnail} />
      <BookTitle>{bookName}</BookTitle>
      <Container>
        <SmallBookInfo>{publisher}</SmallBookInfo>
      </Container>
      <Container>
        <SmallBookInfo>{authorName}</SmallBookInfo>
      </Container>
      <CardTitle>{bookIntroTitle || authorIntroTitle}</CardTitle>
      <CardContent>{bookIntroText || authorIntroText}</CardContent>
    </BasicCard>
  );
}

export default Card;
