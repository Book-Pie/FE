import { getCommentProps } from "src/modules/Slices/comment/types";

export interface ReviewTextareaProps {
  content?: string;
  autoFocus: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
  onClick?: (event: React.ChangeEvent<any>) => void;
  isDisabled: boolean;
}

export interface ReviewsProps {
  bookId: number;
}

export interface ReviewFormProps {
  bookId: number;
  isMyReview: boolean;
  onSubmit?: (reviewContent: string) => void;
  onCancel?: () => void;
  isDisabled?: boolean;
  myReviewContent: getCommentProps;
}

export interface SubmitButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
}

export interface CancelButtonProps {
  isFullButton?: boolean;
  onClick: () => void;
}
