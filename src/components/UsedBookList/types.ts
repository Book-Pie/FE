import { AxiosResponse } from "axios";

export type StateEnumType = {
  SALE: string;
  SOLD_OUT: string;
  TRADING: string;
};

export interface UsedBook {
  id: number;
  title: string;
  price: number;
  image: string;
  state: keyof StateEnumType;
}
export interface UsedBookCardProps {
  card: UsedBook;
  width?: number;
}

export interface UsedBookState {
  pages: UsedBook[];
  pageCount: number;
  isEmpty: boolean;
}

export interface CategoryState {
  [key: string]: string[];
}

export interface CategorysResponse {
  success: boolean;
  data: CategoryState;
  error: null;
}

export type AxiosCategorysResponse<T> = Promise<AxiosResponse<T>>;

export interface UsedBookResponse {
  data: {
    pageCount: number;
    pages: UsedBook[];
  };
  success: boolean;
  erorr: null;
}

export type ReadReturnType = {
  read: <T = any>() => AxiosResponse<T>;
};
export interface UsedBookCategorysProps {
  defaultLocation: string;
  resource: {
    read: <T = any>() => AxiosResponse<T>;
  };
}
export type CacheRefType = {
  [key: string]: {
    read: () => AxiosResponse;
  };
};
export type CreateResourceStatusType = "success" | "pending" | "error";
