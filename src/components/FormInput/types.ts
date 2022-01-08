import { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps {
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
