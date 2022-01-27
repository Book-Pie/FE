export interface WithdrawalForm {
  password: string;
  confirmPassword: string;
}

export interface Response {
  data: boolean;
  error: null;
  success: boolean;
}

export interface Requset {
  password: string;
}
