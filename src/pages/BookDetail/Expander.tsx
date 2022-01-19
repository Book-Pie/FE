import React from "react";
import { Button, ButtonText } from "./style";
import { ExpanderProps } from "./types";

export const Expander: React.FC<ExpanderProps> = ({ text, onClick }) => {
  return (
    <Button onClick={onClick} className="BookDetail_ContentTruncButton">
      <ButtonText>{text}</ButtonText>
      {/* <Icon name={isExpanded ? "up" : "down"} /> */}
    </Button>
  );
};
