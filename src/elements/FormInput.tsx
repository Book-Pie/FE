import { memo } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled, { css } from "styled-components";

interface InputProps {
  size?: number;
}

export interface FormInputProps extends InputProps {
  placeholder?: string;
  id?: string;
  name?: string;
  type?: string;
  disabled?: boolean;
  register?: UseFormRegisterReturn;
  value?: string;
}

const Input = styled.input<InputProps>`
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
  console.log(props);

  return <Input {...props} />;
};

FormInput.defaultProps = {
  type: "text",
  size: 100,
  disabled: false,
};

export default memo(FormInput);
