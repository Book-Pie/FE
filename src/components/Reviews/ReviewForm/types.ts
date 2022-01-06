import { getCommentProps } from "src/modules/Slices/commentSlice";

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
  autoFocus: boolean;
  isMyReview?: boolean;
  onSubmit: (reviewContent: string) => void;
  onCancel?: () => void;
  isDisabled: boolean;
  myReviewContent: getCommentProps;
}

export interface SubmitButtonProps {
  onClick: () => void;
}

export interface CancelButtonProps {
  isFullButton?: boolean;
  onClick: () => void;
}
