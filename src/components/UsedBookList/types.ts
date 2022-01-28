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

export interface CategoryResponse {
  success: boolean;
  data: CategoryState;
  error: null;
}

export interface UsedBookResponse {
  data: {
    pageCount: number;
    pages: UsedBook[];
  };
  success: boolean;
  erorr: null;
}
export interface CategorysProps {
  categorys: CategoryState;
  defaultLocation: string;
}
