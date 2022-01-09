import { ParsedQuery } from "query-string";

export interface IUsedBook {
  id?: number;
  title?: string;
  price?: number;
  image?: string;
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
export interface RequestParam {
  query?: ParsedQuery<string>;
  nextPage: number;
}
