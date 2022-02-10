import { AxiosRequestConfig } from "axios";

export type ResponseEnum = {
  [key: number]: string;
};

export type SuccessResponse = {
  error: null;
  success: boolean;
  data: any;
};

export interface ErrorResponse {
  success: boolean;
  error: {
    message: string;
    status: number;
  };
  data: null;
}

export interface CacheRefType {
  [key: string]: {
    read: () => any;
  };
}

export type HTTPFunctionGetorDelete = <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
export type HTTPFunctionPostorPut = <P, R = void>(url: string, body?: P, config?: AxiosRequestConfig) => Promise<R>;
export type SuspenceType = "success" | "pending" | "error";
