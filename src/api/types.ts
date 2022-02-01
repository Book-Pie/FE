export interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    status: number;
  };
  data: null;
}

export type ResponseEnum = {
  [key: number]: string;
};

export type SuccessResponse = {
  error: null;
  success: boolean;
  data: any;
};
