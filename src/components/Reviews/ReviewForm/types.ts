import { getCommentProps } from "src/modules/Slices/comment/types";

export interface ReviewTextareaProps {
  content?: string;
  autoFocus: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  onClick?: (event: React.ChangeEvent<any>) => void;
  isDisabled: boolean;
}

export interface ReviewsParams {
  bookId: string;
  id: number;
}

export interface ReviewFormProps {
  isbn: string;
  isMyReview: boolean;
  onSubmit?: (reviewContent: string) => void;
  onCancel?: () => void;
  isDisabled?: boolean;
  myComment: getCommentProps | null;
  userId: number;
  checkAuth: () => boolean;
}
