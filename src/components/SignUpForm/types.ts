import { RegisterOptions } from "react-hook-form";
import { FormInputProps } from "../../elements/FormInput";

// SignUpForm 이름으로 쓰고 싶지만 이미 SignUpForm 컴포넌트가 있다.
export interface ISignUpForm {
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

export interface IRows extends FormInputProps {
  id: keyof ISignUpForm;
  text: string;
  options?: RegisterOptions;
}

export interface SignUpFormReponse {
  success: boolean;
  error: null;
  data: boolean;
}

export interface InputWrapperProps {
  isError?: boolean;
}

export interface IAxiosPostPayload {
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
export interface ErrorWrapperProps {
  isError: boolean;
}

export const FormErrorMessages = {
  MAX_LENGTH: "너무 깁니다.",
  MIN_LENGTH: "너무 짧습니다.",
  REQUIRED: "필수 입니다.",
  KOREA_CHARACTERS: "한글이 포함되었습니다.",
  SPECIAL_CHARACTERS: "특수문자가 포함되었습니다.",
  WHITE_SPACE: "공백이 포함 되었습니다.",
  MOBILE_NUMBER: "휴대번호 형식에 맞지 않습니다.",
  EMAIL: "이메일 형식에 맞지 않습니다.",
  PASSWORD_MISMATCH: "비밀번호가 서로 틀립니다.",
  EMAIL_REQUIRED: "이메일은 필수입니다.",
  NICKNAME_REQUIRED: "닉네임은 필수입니다.",
  PASSWORD_REQUIRED: "비밀번호는 필수입니다.",
  NAME_REQUIRED: "이름은 필수입니다.",
  PHONE_REQUIRED: "휴대번호는 필수입니다.",
  POST_REQUIRED: "우편번호는 필수입니다.",
  MAINADRRESS_REQUIRED: "주소는 필수입니다.",
  DETAILADRRESS_REQUIRED: "상세주소는 필수입니다.",
};
