import { BookDetailPanel, BookDetailPanelWrapper } from "pages/BookDetail/BookDetailCard";
import BasicCard from "components/Cards/BasicCard";
import { Reviews } from "components/Reviews/ReviewForm/Reviews";
import { Container } from "./style";

const BookDetailContent = ({ bookIntroText, authorIntroText, bookId }) => {
  return (
    <Container>
      <BasicCard>
        <BookDetailPanel title="책소개">{bookIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        <BookDetailPanel title="저자 소개">{authorIntroText}</BookDetailPanel>
      </BasicCard>
      <BookDetailPanelWrapper>
        <Reviews bookId={bookId} />
      </BookDetailPanelWrapper>
    </Container>
  );
};

export default BookDetailContent;
