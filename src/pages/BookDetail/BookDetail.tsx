import Skeleton from "@mui/material/Skeleton";
import { useBookDetail } from "src/hooks/useBookDetail";
import BookDetailContent from "./BookDetailContent";
import BookSideBar from "./BookSideBar";

const BookDetail = () => {
  // 임시 책 데이터
  const itemId = 9791190938198;

  const { bookDetailItem, loading } = useBookDetail(itemId);
  const { author, categoryName, cover, title, fullDescription, fullDescription2, publisher, isbn13 } = bookDetailItem;
  return loading ? (
    <Skeleton variant="rectangular" width="50%">
      <div style={{ paddingTop: "57%" }}>로딩중</div>
    </Skeleton>
  ) : (
    <>
      <BookSideBar author={author} cover={cover} title={title} categoryName={categoryName} publisher={publisher} />
      <BookDetailContent bookIntroText={fullDescription} authorIntroText={fullDescription2} bookId={isbn13} />
    </>
  );
};

export default BookDetail;
