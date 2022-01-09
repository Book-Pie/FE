import React from "react";
import { Button } from "./style";
import { SubmitButtonProps, CancelButtonProps } from "./types";

export const ClickButton: React.FC<SubmitButtonProps> = ({ onClick, children }) => {
  return (
    <Button type="button" onClick={onClick}>
      {children}
    </Button>
  );
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isDisabled, onClick, children }) => {
  return (
    <Button type="submit" disabled={isDisabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>취소</Button>;
};
