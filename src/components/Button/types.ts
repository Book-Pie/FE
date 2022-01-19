export interface SubmitButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
}

export interface CancelButtonProps {
  isFullButton?: boolean;
  onClick: () => void;
}
