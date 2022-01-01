export interface FindIdInputForm {
  name: "";
  email: "";
  phone: "";
}

export interface AxiosResponse {
  success: boolean;
  error: null;
  data: string;
}
export interface AxiosPayload {
  email: string;
  phone: string;
  name: string;
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
};
