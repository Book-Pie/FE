import Skeleton from "@mui/material/Skeleton";
import { useBookDetail } from "hooks/useBookDetail";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router";
import { commentsSelector } from "src/modules/Slices/comment/commentSlice";
import { useTypedSelector } from "src/modules/store";
import StarRating from "../Rating/StarRating";
import { Reviews } from "../Reviews/Reviews";
import { BookDetailPanel, BookDetailPanelWrapper } from "./BookDetailCard";
import BookRecommendList from "./BookRecommendList";
import {
  BookCategory,
  BookDetailContentWrapper,
  BookDetailHeaderWrapper,
  BookDetailImg,
  BookDetailTopContent,
  BookInfo,
  BookTitle,
  CardBase,
  Container,
  FlexColum,
  FlexWrapper,
  SmallBookInfo,
} from "./style";
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
        <BookDetailHeaderWrapper>
          <BookDetailTopContent>
            <BookDetailImg src={cover} />
            <BookInfo>
              <BookCategory>{categoryName}</BookCategory>
              <BookTitle>{title}</BookTitle>
              <SmallBookInfo>{author}</SmallBookInfo>
              <SmallBookInfo>{publisher}</SmallBookInfo>
              <StarRating ReviewRank={ReviewRank} title="알라딘" />
              <br />
              <StarRating ReviewRank={averageRating} title="북파이" />
            </BookInfo>
          </BookDetailTopContent>
        </BookDetailHeaderWrapper>
        <BookDetailContentWrapper>
          <Container>
            {authorInfo && (
              <CardBase>
                <BookDetailPanel title="저자 소개" authorName={authorName} authorPhoto={authorPhoto}>
                  {authorInfo}
                </BookDetailPanel>
              </CardBase>
            )}
            <CardBase>
              <BookDetailPanel title="기본 정보">{fullDescription}</BookDetailPanel>
            </CardBase>
            <CardBase>
              <BookDetailPanel title="출판사제공 책소개">{fullDescription2}</BookDetailPanel>
            </CardBase>
            <BookDetailPanelWrapper>
              <Reviews bookId={isbn13} categoryName={categoryName} />
            </BookDetailPanelWrapper>
          </Container>
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
