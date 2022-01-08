import React from "react";
import { CardBase } from "./style";
import { IProps } from "./types";

const BasicCard: React.FC<IProps> = props => {
  return <CardBase onClick={props.event}>{props.children}</CardBase>;
};

export default BasicCard;
