import { StateEnumType } from "src/components/UsedBookCard/types";

export interface IUsedBook {
  id: number;
  title: string;
  price: number;
  image: string;
  state: keyof StateEnumType;
}

export interface UsedBookState {
  pages: IUsedBook[][];
  pageCount: number;
  isEmpty: boolean;
}

export interface ICategory {
  [key: string]: string[];
}

export interface CategorysResponse {
  success: boolean;
  data: ICategory;
  error: null;
}

export interface UsedBooksResponse {
  data: {
    pageCount: number;
    pages: IUsedBook[];
  };
  success: boolean;
  erorr: null;
}
