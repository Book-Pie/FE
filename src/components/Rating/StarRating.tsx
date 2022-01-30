import Rating from "@mui/material/Rating";
import { BookRatingContent, RatingContent, RatingScore } from "src/components/BookDetail/style";

export interface ReviewRankProps {
  ReviewRank: number;
}

const StarRating = ({ ReviewRank }: ReviewRankProps) => {
  return (
    <BookRatingContent>
      <RatingContent>알라딘 평균</RatingContent>
      <RatingContent>
        <Rating name="read-only" precision={0.5} value={ReviewRank} size="small" readOnly />
        <RatingScore>({ReviewRank})점</RatingScore>
      </RatingContent>
    </BookRatingContent>
  );
};

export default StarRating;
