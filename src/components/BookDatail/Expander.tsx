import React from "react";

interface Props {
  isExpanded: boolean;
  text: string;
  onClick: (e: React.SyntheticEvent<any>) => void;
}

export const Expander: React.FC<Props> = props => {
  const { isExpanded, text, onClick } = props;
  return (
    <button onClick={onClick} className="BookDetail_ContentTruncButton">
      {text}
      {/* <Icon name={isExpanded ? "up" : "down"} /> */}
    </button>
  );
};
