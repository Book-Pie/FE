import { AxiosResponse } from "axios";
import { SuccessResponse } from "api/types";

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

export interface Categorys {
  [key: string]: string[];
}

export interface CategorysResponse extends SuccessResponse {
  data: Categorys;
}
export interface UsedBookListResponse extends SuccessResponse {
  data: {
    pageCount: number;
    pages: UsedBook[];
  };
}

export type ReadReturnType = {
  read: <T = any>() => AxiosResponse<T>;
};
export interface UsedBookCategorysProps {
  defaultLocation: string;
  resource: {
    read: () => CategorysResponse;
  };
}
