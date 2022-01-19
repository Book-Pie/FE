import React from "react";
import { BrownSubButton, Button, BrownMainButton } from "./styles";
import { CancelButtonProps, SubmitButtonProps } from "./types";

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

export const DetailSubButton: React.FC<SubmitButtonProps> = ({ onClick, children }) => {
  return (
    <BrownSubButton type="button" onClick={onClick}>
      {children}
    </BrownSubButton>
  );
};

export const DetailMainButton: React.FC<SubmitButtonProps> = ({ onClick, children }) => {
  return (
    <BrownMainButton type="button" onClick={onClick}>
      {children}
    </BrownMainButton>
  );
};
