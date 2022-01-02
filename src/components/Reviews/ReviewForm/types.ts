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
  autoFocus: boolean;
  isMyReview?: boolean;
  onSubmit: (reviewContent: string) => void;
  onCancel?: () => void;
  isDisabled: boolean;
}

export interface SubmitButtonProps {
  isDisabled: boolean;
  isFetching: boolean;
  onClick: () => void;
}

export interface CancelButtonProps {
  isFullButton?: boolean;
  onClick: () => void;
}
