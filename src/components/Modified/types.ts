import { SuccessResponse } from "src/api/types";
import { Dispatch, SetStateAction } from "react";
import { RegisterOptions } from "react-hook-form";

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

export interface PasswordCheckResponse extends SuccessResponse {
  data: boolean;
}

export type PasswordCheckPayload = {
  password: string;
};
export interface ProfileImgUpdatePayload {
  name: string;
  phone: string;
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string;
  };
}

export interface ModifiedConfirmProps {
  passwordOpions: RegisterOptions;
  setReconfirmation: Dispatch<SetStateAction<boolean>>;
  handlePassword: (password: string, token: string, methodType: "put" | "post") => Promise<void>;
  handlePopupMessage: (isSuccess: boolean, message: string) => void;
}
