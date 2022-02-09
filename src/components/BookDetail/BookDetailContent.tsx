import { BookDetailPanel, BookDetailPanelWrapper } from "components/BookDetail/BookDetailCard";
import BasicCard from "components/Cards/BasicCard";
import { Reviews } from "components/Reviews/ReviewForm/Reviews";
import { Container } from "./style";
import { bookDetailContentProps } from "./types";

const BookDetailContent = ({
  bookIntroText,
  authorIntroText,
  bookId,
  categoryName,
  authorInfo,
  authorName,
  authorPhoto,
}: bookDetailContentProps) => {
  return (
    <Container>
      {authorInfo && (
        <BasicCard>
          <BookDetailPanel title="저자 소개" authorName={authorName} authorPhoto={authorPhoto}>
            {authorInfo}
          </BookDetailPanel>
        </BasicCard>
      )}
      <BasicCard>
        <BookDetailPanel title="기본 정보">{bookIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        <BookDetailPanel title="출판사제공 책소개">{authorIntroText}</BookDetailPanel>
      </BasicCard>
      <BookDetailPanelWrapper>
        <Reviews bookId={bookId} categoryName={categoryName} />
      </BookDetailPanelWrapper>
    </Container>
  );
};

export default BookDetailContent;
