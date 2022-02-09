import { getCommentProps } from "modules/Slices/comment/types";

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
  myComment: getCommentProps | null;
  categoryName: string;
  checkAuth: () => boolean;
}
