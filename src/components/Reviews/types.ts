import { GetCommentProps } from "modules/Slices/comment/types";

export type DateDTO = string;
export type BookId = number;

export interface ReviewListEmptyParam {
  title: string;
}

export interface BestReviewItemParam {
  item: GetCommentProps;
}

export interface Review {
  reviewId: number;
  id: number;
  userId: number;
  content: string;
}

export interface ReviewListProps {
  commentList: GetCommentProps[];
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
  content: GetCommentProps;
  children?: React.ReactNode;
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
  myComment?: GetCommentProps;
  categoryName: string;
  checkAuth: () => boolean;
}

export interface ReviewTextareaProps {
  content?: string;
  autoFocus: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  onClick?: (event: React.ChangeEvent<any>) => void;
  isDisabled: boolean;
}

export interface MyReviewCommentParam {
  bookId: string;
  token: string;
}

export interface ReviewsParam {
  bookId: string;
  categoryName: string;
}

export interface ReviewsParams {
  bookId: string;
  query: string;
  token: string | null;
}

export interface ReviewFormProps {
  isbn: string;
  isMyReview: boolean | null;
  onSubmit?: (reviewContent: string) => void;
  onCancel?: () => void;
  isDisabled?: boolean;
  myComment: GetCommentProps | null;
  categoryName: string;
  checkAuth: () => boolean;
}
