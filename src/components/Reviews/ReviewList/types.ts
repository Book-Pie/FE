export interface Review {
  review_id: number;
  id: number;
  user_id: number;
  content: string;
}

export interface ReviewListProps {
  bookId: number;
  reviewList: Review[];
}

export interface Comment {
  id: number;
  maskedUId: string;
  commentDate: DateDTO;
  content: string;
  isMyComment: boolean;
}

export interface ReviewItemProps {
  key: number;
  user: number;
  bookId: number;
  content: string;
  children?: React.ReactNode;
}

export interface TruncateProps extends React.HTMLProps<Truncate> {
  lines?: number | false;
  ellipsis?: React.ReactNode;
  trimWhitespace?: boolean;
  onTruncate?(isTruncated: boolean): void;
}

export interface ReviewsWriteProps {
  bookId: number;
  myReviewId: number;
}

export type DateDTO = string;
export type BookId = number;
