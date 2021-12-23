import { memo } from "react";
import { Label } from "./style";
import { FormLabelProps } from "./types";

const FormLabel = ({ text, id }: FormLabelProps) => {
  return <Label htmlFor={id}>{text}</Label>;
};

export default memo(FormLabel);
