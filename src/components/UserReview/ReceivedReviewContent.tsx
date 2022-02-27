import { Link } from "react-router-dom";
import { RatingContent, RatingScore } from "components/BookDetail/style";
import Rating from "@mui/material/Rating";
import { useMediaQuery } from "@mui/material";
import { ColorContent, ContentItem, ContentWrapper, TitleContentItem } from "../BuyList/styles";
import { UserReviewContentProps } from "./types";

const ReceivedReviewContent = ({ contents }: UserReviewContentProps) => {
  const max630 = useMediaQuery("(max-width:630px)");

  return (
    <div>
      {contents.map((item, idx) => {
        const { content, rating, reviewDate, usedBookId, usedBookTitle, buyerName } = item;
        return max630 ? (
          <ContentWrapper key={idx}>
            <ContentItem>
              {buyerName}
              <Link to={`/usedBook/${usedBookId}`}>
                <ColorContent>{usedBookTitle}</ColorContent>
              </Link>
              <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
            </ContentItem>
            <ContentItem>{content}</ContentItem>
            <ContentItem>{reviewDate.split("T", 1)}</ContentItem>
          </ContentWrapper>
        ) : (
          <ContentWrapper key={idx}>
            <ContentItem>
              <RatingContent>
                <Rating name="read-only" precision={0.5} value={rating} size="small" readOnly />
                <br />
                <RatingScore>{rating}점</RatingScore>
              </RatingContent>
            </ContentItem>
            <ContentItem>{buyerName}</ContentItem>
            <TitleContentItem>
              <Link to={`/usedBook/${usedBookId}`}>
                <ColorContent>{usedBookTitle}</ColorContent>
              </Link>
            </TitleContentItem>
            <ContentItem>{content}</ContentItem>
            <ContentItem>{reviewDate.split("T", 1)}</ContentItem>
          </ContentWrapper>
        );
      })}
    </div>
  );
};

export default ReceivedReviewContent;
