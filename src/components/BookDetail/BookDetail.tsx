import Skeleton from "@mui/material/Skeleton";
import { useBookDetail } from "hooks/useBookDetail";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { commentsSelector } from "src/modules/Slices/comment/commentSlice";
import { useTypedSelector } from "src/modules/store";
import BookDetailContent from "./BookDetailContent";
import BookDetailHeader from "./BookDetailHeader";
import BookRecommendList from "./BookRecommendList";
import { BookDetailContentWrapper, FlexColum, FlexWrapper } from "./style";
import { BookDetailParam } from "./types";
import UsedBookRecommendList from "./UsedBookRecommendList";

const BookDetail = () => {
  const { isbn13 } = useParams<BookDetailParam>();
  const { pathname } = useLocation();
  const { bookContent } = useBookDetail({ isbn13 });
  const { averageRating } = useTypedSelector(commentsSelector);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (bookContent.length !== 0) {
    const {
      author,
      categoryName,
      cover,
      title,
      fullDescription,
      fullDescription2,
      publisher,
      customerReviewRank,
      subInfo,
    } = bookContent[0];

    let ReviewRank = 0;
    if (customerReviewRank > 0) {
      ReviewRank = customerReviewRank / 2;
    } else {
      ReviewRank = 0;
    }
    const { authorInfo, authorName, authorPhoto } = subInfo.authors[0];

    return (
      <>
        <BookDetailHeader
          ReviewRank={ReviewRank}
          title={title}
          author={author}
          cover={cover}
          categoryName={categoryName}
          publisher={publisher}
          averageRating={averageRating}
        />
        <BookDetailContentWrapper>
          <BookDetailContent
            bookIntroText={fullDescription}
            authorIntroText={fullDescription2}
            bookId={isbn13}
            categoryName={categoryName}
            authorInfo={authorInfo}
            authorName={authorName}
            authorPhoto={authorPhoto}
          />
          <UsedBookRecommendList isbn={isbn13} />
          <BookRecommendList isbn={isbn13} />
        </BookDetailContentWrapper>
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
