import React from "react";
import { Button } from "./style";
import { SubmitButtonProps, CancelButtonProps } from "./types";

export const SubmitButton: React.FC<SubmitButtonProps> = props => {
  const { isDisabled, onClick } = props;

  return (
    <Button disabled={isDisabled} onClick={onClick}>
      {props.children}
    </Button>
  );
};

export const CancelButton: React.FC<CancelButtonProps> = props => {
  const { onClick } = props;

  return <Button onClick={onClick}>취소</Button>;
};
