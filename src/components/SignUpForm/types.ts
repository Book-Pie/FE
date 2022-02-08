import { RegisterOptions, FieldErrors, UseFormRegister } from "react-hook-form";
import { FormInputProps } from "elements/FormInput";
import { SuccessResponse } from "api/types";
import { Dispatch, SetStateAction } from "react";

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
  code: string;
}

export interface Row extends FormInputProps {
  id: keyof SignUpForm;
  text: string;
  options?: RegisterOptions;
}

export interface CheckReponse extends SuccessResponse {
  data: boolean;
}
export interface EmailCodeReponse extends SuccessResponse {
  data: boolean;
}

export interface SignUpPayload {
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
export interface EmailConfirmProps {
  register: UseFormRegister<SignUpForm>;
  errors: FieldErrors<SignUpForm>;
  isEmailconfirmRender: boolean;
}
