export interface HoverRatingProps {
  isMyReview: boolean;
  rating: number;
  handleChange?: (event: any, newValue: React.SetStateAction<number>) => void;
}
