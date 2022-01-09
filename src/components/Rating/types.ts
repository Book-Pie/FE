export interface HoverRatingProps {
  isMyReview: boolean;
  rating: number;
  handleChange?: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
}
