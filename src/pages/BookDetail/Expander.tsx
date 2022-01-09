import React from "react";
import { Button } from "./style";
import { ExpanderProps } from "./types";

export const Expander: React.FC<ExpanderProps> = ({ text, onClick }) => {
  return (
    <Button onClick={onClick} className="BookDetail_ContentTruncButton">
      {text}
      {/* <Icon name={isExpanded ? "up" : "down"} /> */}
    </Button>
  );
};
