import Rating from "@mui/material/Rating";
import { RatingContent, RatingScore } from "components/BookDetail/style";

export interface ReviewRankProps {
  ReviewRank: number;
}

const StarRating = ({ ReviewRank }: ReviewRankProps) => {
  return (
    <>
      <RatingContent>알라딘 평균</RatingContent>
      <RatingContent>
        <Rating name="read-only" precision={0.5} value={ReviewRank} size="small" readOnly />
        <RatingScore>({ReviewRank})점</RatingScore>
      </RatingContent>
    </>
  );
};

export default StarRating;
