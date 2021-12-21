import React from "react";
import styled from "styled-components";

interface IProps {
  title?: string;
  event?: () => void;
  children?: React.ReactNode;
}

const BasicCard: React.FC<IProps> = props => {
  return <CardBase onClick={props.event}>{props.children}</CardBase>;
};

const CardBase = styled.div`
  border-radius: 16px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.18);
  padding: 20px;
  margin: 0 auto;
  margin-top: 50px;
  overflow-y: hidden;
`;

export default BasicCard;
