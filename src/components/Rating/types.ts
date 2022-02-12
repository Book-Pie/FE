export interface HoverRatingProps {
  isDisabled?: boolean;
  rating: number;
  handleChange: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void;
}

export interface ReviewRankProps {
  ReviewRank: number;
  title: string;
}
