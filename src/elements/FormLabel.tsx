import { memo } from "react";
import styled from "styled-components";

export interface FormLabelProps {
  text: string;
  id?: string;
}

export const Label = styled.label`
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
`;

const FormLabel = ({ text, id }: FormLabelProps) => {
  return <Label htmlFor={id}>{text}</Label>;
};

export default memo(FormLabel);
