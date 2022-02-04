import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";

export interface FormInputProps {
  size?: number;
  placeholder?: string;
  id?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  value?: string;
}

const Input = styled.input<{ size?: number }>`
  ${({ size }) =>
    size &&
    css`
      width: ${size}%;
    `}

  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border: 1px solid rgba(122, 110, 110, 0.8);
  border-radius: 2px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: rgb(122, 110, 110);
  }
`;

const FormInput = (props: FormInputProps) => {
  const { register } = props;

  if (register) {
    return <Input {...props} {...register} />;
  }

  return <Input {...props} />;
};

FormInput.defaultProps = {
  type: "text",
  size: 100,
  disabled: false,
};

export default memo(FormInput);
