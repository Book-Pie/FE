import { Link } from "react-router-dom";
import { GetUserReceivedReviewListData } from "modules/Slices/userReview/types";
import { RatingContent, RatingScore } from "src/components/BookDetail/style";
import Rating from "@mui/material/Rating";
import { ColorContent, ContentItem, ContentWrapper, TitleContentItem } from "../BuyList/styles";

export interface UserReviewContentProps {
  contents: GetUserReceivedReviewListData[];
}

const ReceivedReviewContent = ({ contents }: UserReviewContentProps) => {
  return (
    <div>
      {contents.map((item, idx) => {
        const { content, rating, reviewDate, usedBookId, usedBookTitle, buyerName } = item;

        return (
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
