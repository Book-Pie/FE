import React from "react";
import { Button } from "./style";
import { SubmitButtonProps, CancelButtonProps } from "./types";

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isDisabled, onClick, children }) => {
  return (
    <Button disabled={isDisabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>취소</Button>;
};
