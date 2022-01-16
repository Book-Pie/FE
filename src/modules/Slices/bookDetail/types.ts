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

export interface bookInfoHeader {
  ReviewRank: number;
  title: string;
  author: string;
  cover: string;
  categoryName: string;
  publisher: string;
}

export interface bookDisplayData {
  item: bookInfo[];
}

// 통신 성공 시 반환하는 타입
export interface bookAsyncSuccess {
  success: boolean;
  data: bookDisplayData;
  error: null;
}

// 통신 실패 시 반환하는 타입
export interface bookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

export interface ItemId {
  itemId: number;
}

// 썽크함수가 사용하는 api 타입
export interface ThunkApi {
  extra: {
    history: History;
  };
  rejectValue: bookAsyncFail;
}

export const name = "book";
