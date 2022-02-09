import Rating from "@mui/material/Rating";
import { RatingContent, RatingScore } from "components/BookDetail/style";

export interface ReviewRankProps {
  ReviewRank: number;
  title: string;
}

const StarRating = ({ ReviewRank, title }: ReviewRankProps) => {
  return (
    <>
      <RatingContent>{title} 평균 </RatingContent>
      <RatingContent>
        <Rating name="read-only" precision={0.1} value={ReviewRank} size="small" readOnly />
        <RatingScore>({ReviewRank})점</RatingScore>
      </RatingContent>
    </>
  );
};

export default StarRating;
