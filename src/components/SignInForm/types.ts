import { FormInputProps } from "elements/FormInput";
import { RegisterOptions } from "react-hook-form";

export interface SignInForm {
  email: string;
  password: string;
}
export interface Rows extends FormInputProps {
  options: RegisterOptions;
  id: keyof SignInForm;
  placeholder?: string;
}
export interface SignInFormProps {
  isRemember: boolean;
}
