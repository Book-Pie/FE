import React from "react";
import { CardBase } from "./style";
import { IProps } from "./types";

const BasicCard: React.FC<IProps> = props => {
  const { event, children } = props;
  return <CardBase onClick={event}>{children}</CardBase>;
};

export default BasicCard;
