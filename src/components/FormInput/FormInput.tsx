import { memo } from "react";
import * as Styled from "./style";
import { FormInputProps } from "./types";

const FormInput: React.FC<FormInputProps> = props => {
  const { register } = props;

  if (register) {
    return <Styled.Input {...props} {...register} />;
  }

  return <Styled.Input {...props} />;
};

FormInput.defaultProps = {
  type: "text",
  size: 100,
  disabled: false,
};

export default memo(FormInput);
