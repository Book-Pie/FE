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

export interface bookInfo {
  title: string;
  author: string;
  pubDate: string;
  description: string;
  cover: string;
  categoryName: string;
  publisher: string;
  fullDescription: string;
  fullDescription2: string;
  isbn13: string;
  isbn: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  categoryId: number;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  customerReviewRank: number;
}

export interface bookDisplayData {
  item: bookInfo[];
}

// 통신 성공 시 반환하는 타입
export interface BookAsyncSuccess {
  success: boolean;
  data: bookDisplayData;
  error: null;
}

export interface BookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 리듀가 사용할 데이터 타입
export interface BookReduce {
  content: BookAsyncSuccess;
  bestSeller: BookItemProps[];
  status: "loading" | "idle" | "success" | "failed";
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
