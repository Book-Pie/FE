import { getCommentProps } from "modules/Slices/commentSlice";

export interface Review {
  review_id: number;
  id: number;
  user_id: number;
  content: string;
}

export interface ReviewListProps {
  bookId: number;
  commentList: getCommentProps[];
  myCommentId: number;
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
  content: getCommentProps;
  children?: React.ReactNode;
  myCommentId: number;
}

export interface TruncateProps extends React.HTMLProps<Truncate> {
  lines?: number | false;
  ellipsis?: React.ReactNode;
  trimWhitespace?: boolean;
  onTruncate?(isTruncated: boolean): void;
}

export interface ReviewsWriteProps {
  bookId: number;
  myReviewCheck: boolean;
  myReviewContent: getCommentProps;
}

export type DateDTO = string;
export type BookId = number;
