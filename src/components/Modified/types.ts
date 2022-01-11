export interface IModifiedConfirmForm {
  password: string;
}
export interface IModifiedForm {
  name: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  postalCode: string;
  mainAddress: string;
  detailAddress: string;
}

export interface IAxiosPayload {
  password: string;
}

export interface IAxiosResponse {
  data: string;
  success: boolean;
  error: null;
}

export interface IMyProfileUpdatePayload {
  name: string;
  phone: string;
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string;
  };
}
