import { BookDetailPanel, BookDetailPanelWrapper } from "components/BookDetail/BookDetailCard";
import BasicCard from "components/Cards/BasicCard";
import { Reviews } from "components/Reviews/ReviewForm/Reviews";
import { Container } from "./style";
import { bookDetailContentProps } from "./types";

const BookDetailContent = ({ bookIntroText, authorIntroText, bookId, categoryName }: bookDetailContentProps) => {
  return (
    <Container>
      <BasicCard>
        <BookDetailPanel title="책소개">{bookIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        <BookDetailPanel title="저자 소개">{authorIntroText}</BookDetailPanel>
      </BasicCard>
      <BookDetailPanelWrapper>
        <Reviews bookId={bookId} categoryName={categoryName} />
      </BookDetailPanelWrapper>
    </Container>
  );
};

export default BookDetailContent;
