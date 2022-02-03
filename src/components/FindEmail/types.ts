import { SuccessResponse } from "src/api/types";

export interface FindEmailForm {
  name: string;
  phone: string;
}

export type FindEmailPayload = FindEmailForm;
export interface FindEmailReponse extends SuccessResponse {
  data: string;
}

export interface FormProps {
  onSubmit: (FormData: FindEmailForm) => void;
}
