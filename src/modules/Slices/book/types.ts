// initialState로 사용할 객체의 data
interface BookItemProps {
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

// 리듀가 사용할 데이터 타입
export interface BookListReduceProps {
  bestSellerItem: BookItemProps[];
  status: "loading" | "idle";
  error: null | {
    code: number;
    message: string;
  };
  item: BookItemProps[];
}

// 썽크함수 성공시 반환 타입
export interface getBookAsyncSuccess {
  success: boolean;
  data: {
    totalResults: number;
    startIndex: number;
    item: BookItemProps[];
  };
  error: null;
}

// 썽크함수가 실패시 반환 타입
export interface getBookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 썽크함수가 사용하는 api 타입
export interface ThunkApi {
  rejectValue: getBookAsyncFail;
}

export const name = "bookReduce";
