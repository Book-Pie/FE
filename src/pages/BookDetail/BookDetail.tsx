import Skeleton from "@mui/material/Skeleton";
import { useBookDetail } from "src/hooks/useBookDetail";
import BookDetailContent from "./BookDetailContent";
import BookDetailHeader from "./BookDetailHeader";
import { FlexColum, FlexWrapper } from "./style";
import { BookDetailProps } from "./types";

const BookDetail = ({ match }: BookDetailProps) => {
  const { itemId } = match.params;
  const { id } = match.params;
  const { bookContent } = useBookDetail({ itemId, id });

  if (bookContent.length !== 0) {
    const { author, categoryName, cover, title, fullDescription, fullDescription2, publisher, customerReviewRank } =
      bookContent[0];

    let ReviewRank = 0;
    if (customerReviewRank > 0) {
      ReviewRank = customerReviewRank / 2;
    } else {
      ReviewRank = 0;
    }
    return (
      <>
        <BookDetailHeader
          ReviewRank={ReviewRank}
          title={title}
          author={author}
          cover={cover}
          categoryName={categoryName}
          publisher={publisher}
        />
        <BookDetailContent
          bookIntroText={fullDescription}
          authorIntroText={fullDescription2}
          bookId={itemId}
          myUserId={id}
        />
      </>
    );
  }

  return (
    <FlexWrapper>
      <FlexColum>
        <Skeleton variant="rectangular" width={1200} height={300} />
        <Skeleton sx={{ marginTop: 10, marginLeft: 30 }} variant="rectangular" width={700} height={220} />
        <Skeleton sx={{ marginTop: 5, marginLeft: 30 }} variant="rectangular" width={700} height={220} />
      </FlexColum>
    </FlexWrapper>
  );
};

export default BookDetail;
