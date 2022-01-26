import { RegisterOptions } from "react-hook-form";
import { FormInputProps } from "src/elements/FormInput";

export interface SignUpForm {
  name: string;
  nickName: string;
  password: string;
  confirmPassword: string;
  phone: string;
  email: string;
  postalCode: string;
  mainAddress: string;
  detailAddress: string;
}

export interface Row extends FormInputProps {
  id: keyof SignUpForm;
  text: string;
  options?: RegisterOptions;
}

export interface Reponse {
  success: boolean;
  error: null;
  data: boolean;
}

export interface RequestPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
  nickName: string;
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string;
  };
}
