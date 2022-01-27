// initialState로 사용할 객체의 data
export interface BookItemProps {
  author: string;
  isbn: string;
  link: string;
  description: string;
  title: string;
  pubDate: string;
  categoryName: string;
  fixedPrice: boolean;
  mallType: string;
  customerReviewRank: number;
  cover: string;
  itemId: number;
  subInfo: any;
  isbn13: string;
  stockStatus: string;
  publisher: string;
  priceSales: number;
  salesPoint: number;
  adult: boolean;
  categoryId: number;
  priceStandard: number;
  mileage: number;
  bestRank: number;
  // itemId: number;
  // title: string;
  // categoryName: string;
  // cover: string;
  // bestRank: number;
}

export interface SubCategoryData {
  categoryId: number;
  categoryName: string;
  parentId: number;
  subCategory: [];
}
export interface ParentsCategoryData {
  categoryId: number;
  categoryName: string;
  parentId: number;
  subCategory: SubCategoryData[];
}

// 리듀가 사용할 데이터 타입
export interface BookListReduceProps {
  bestSellerItem: BookItemProps[];
  status: "loading" | "idle";
  error: null | {
    code: number;
    message: string;
  };
  item: BookItemProps[];

  list: {
    pages: BookItemProps[][];
    pageCount: number;
    isEmpty: boolean;
  };
}

// 썽크함수 성공시 반환 타입
export interface GetBookAsyncSuccess {
  success: boolean;
  data: {
    totalResults: number;
    startIndex: number;
    item: BookItemProps[];
  };
  error: null;
}

export interface GetReviewBookAsyncSuccess {
  data: GetBookAsyncSuccess;
  status: number;
  statusText: string;
}

export interface GetCategoryAsyncSuccess {
  success: boolean;
  data: ParentsCategoryData[];
  error: string;
}

// 썽크함수가 실패시 반환 타입
export interface GetBookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 썽크함수가 사용하는 api 타입
export interface ThunkApi {
  rejectValue: GetBookAsyncFail;
}

export const name = "bookReduce";
