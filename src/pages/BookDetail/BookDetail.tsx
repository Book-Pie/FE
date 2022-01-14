import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { useBookDetail } from "src/hooks/useBookDetail";
import BookDetailContent from "./BookDetailContent";
import BookSideBar from "./BookSideBar";
import { FlexColum, FlexWrapper } from "./style";
import { BookDetailProps } from "./types";

const BookDetail = ({ match }: BookDetailProps) => {
  let { itemId } = match.params;
  itemId = parseInt(String(itemId), 10);
  const { bookContent } = useBookDetail(itemId);

  if (bookContent.length !== 0) {
    const { author, categoryName, cover, title, fullDescription, fullDescription2, publisher } = bookContent[0];

    return (
      <>
        <BookSideBar author={author} cover={cover} title={title} categoryName={categoryName} publisher={publisher} />
        <BookDetailContent bookIntroText={fullDescription} authorIntroText={fullDescription2} bookId={itemId} />
      </>
    );
  }

  return (
    <FlexWrapper>
      <FlexColum>
        <Skeleton sx={{ marginRight: 5, marginTop: 10 }} variant="rectangular" width={250} height={300} />
        <Box sx={{ pt: 0, marginRight: 5 }}>
          <Skeleton width="250px" />
          <Skeleton width="150px" />
        </Box>
      </FlexColum>
      <FlexColum>
        <Skeleton sx={{ marginTop: 10 }} variant="rectangular" width={700} height={220} />
        <Skeleton sx={{ marginTop: 5 }} variant="rectangular" width={700} height={220} />
      </FlexColum>
    </FlexWrapper>
  );
};

export default BookDetail;
