export interface IWithdrawalForm {
  password: string;
  confirmPassword: string;
}

export interface WithdrawalProps {
  path: string;
}

export interface IAxiosResponse {
  data: boolean;
  error: null;
  success: boolean;
}

export interface IAxiosRequsetPayload {
  password: string;
}
