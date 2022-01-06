import CreateImgItem from "../../components/Image/CreateImgItem";
import dummy from "../../db/data.json";
import { BookDetailPanel, BookDetailPanelWrapper } from "../../pages/BookDetail/BookDetailCard";
import BasicCard from "../../components/Cards/BasicCard";
import { Reviews } from "../../components/Reviews/ReviewForm/Reviews";
import { Container } from "./style";

const BookDetailContent = () => {
  const ImgList = dummy.img.map(item => <CreateImgItem key={item.id} img={item.img} />);
  console.log(ImgList);

  const bookIntroText = dummy.book[0].bookIntroText;
  const authorIntroText = dummy.book[0].authorIntroText;
  const bookId = dummy.comments[0].bookId;

  return (
    <Container>
      <BasicCard>
        <BookDetailPanel title="책소개">{bookIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        <BookDetailPanel title="저자 소개">{authorIntroText}</BookDetailPanel>
      </BasicCard>
      <BasicCard>
        {/* <BookDetailPanel title="저자의 다른 도서" useTruncate={false}>
          {ImgList[0].props.img}
        </BookDetailPanel> */}
      </BasicCard>
      <BookDetailPanelWrapper>
        <Reviews bookId={bookId} />
      </BookDetailPanelWrapper>
    </Container>
  );
};

export default BookDetailContent;
