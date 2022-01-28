import { getCommentProps } from "src/modules/Slices/comment/types";

export type DateDTO = string;
export type BookId = number;

export interface Review {
  reviewId: number;
  id: number;
  userId: number;
  content: string;
}

export interface ReviewListProps {
  commentList: getCommentProps[];
  myCommentId: number;
  pageCount: number;
  totalCount: number;
  page: number;
  onChange: (_: React.ChangeEvent<unknown>, value: number) => void;
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

export interface TruncateProps {
  lines?: number | false;
  ellipsis?: React.ReactNode;
  trimWhitespace?: boolean;
  onTruncate?(isTruncated: boolean): void;
}

export interface ReviewsWriteProps {
  bookId: string;
  myReviewCheck: boolean;
  myComment?: getCommentProps;
  myCommentId?: number;
  checkAuth: () => boolean;
}
