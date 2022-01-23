export interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    status: number;
  };
  data: null;
}

export type ResponseEnumType = {
  [key: number]: string;
};
