import React from "react";
import { Button } from "./style";
import { ExpanderProps } from "./types";

export const Expander: React.FC<ExpanderProps> = props => {
  const { isExpanded, text, onClick } = props;
  return (
    <Button onClick={onClick} className="BookDetail_ContentTruncButton">
      {text}
      {/* <Icon name={isExpanded ? "up" : "down"} /> */}
    </Button>
  );
};
