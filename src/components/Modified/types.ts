export interface ModifiedConfirmForm {
  password: string;
}
export interface ModifiedForm {
  name: string;
  phone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  postalCode: string;
  mainAddress: string;
  detailAddress: string;
}

export interface Request {
  password: string;
}

export interface Response {
  data: string;
  success: boolean;
  error: null;
}

export interface MyProfileUpdateRequest {
  name: string;
  phone: string;
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string;
  };
}
