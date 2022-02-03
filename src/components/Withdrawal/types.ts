import { SuccessResponse } from "src/api/types";

export interface WithdrawalForm {
  password: string;
  confirmPassword: string;
}

export interface PasswordCheckResponse extends SuccessResponse {
  data: boolean;
}
export interface WithdrawalResponse extends SuccessResponse {
  data: boolean;
}

export interface PasswordCheckRequset {
  password: string;
}
