import React from "react";
import styled from "styled-components";

interface Props {
  isExpanded: boolean;
  text: string;
  onClick: (e: React.SyntheticEvent<any>) => void;
}

export const Expander: React.FC<Props> = props => {
  const { isExpanded, text, onClick } = props;
  return (
    <Button onClick={onClick} className="BookDetail_ContentTruncButton">
      {text}
      {/* <Icon name={isExpanded ? "up" : "down"} /> */}
    </Button>
  );
};

const Button = styled.button`
  cursor: pointer;
  color: #646c73;
  border: none;
  background-color: white;
`;
