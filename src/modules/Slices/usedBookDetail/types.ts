// =========================== 썽크함수 성공 시 리턴 타입 ===========================

export interface PagesResponse {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: Date;
  modifiedDate: Date;
  state: string;
  likeCount: number;
  replyCount: number;
}

export interface UsedBookDetailResponse {
  usedBookId: number;
  isbn: number;
  sellerId: number;
  sellerName: string;
  price: number;
  title: string;
  content: string;
  uploadDate: Date;
  view: number;
  bookState: string;
  saleState: string;
  fstCategory: string;
  sndCategory: string;
  tags: string[];
  images: string[];
}

export interface UsedBookLikeGetResponse {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface MyUsedBookAsyncSuccess {
  success: boolean;
  data: {
    pageCount: number;
    pages: PagesResponse[];
  };
  error: null;
}

export interface UsedBookDetailAsyncSuccess {
  success: boolean;
  data: UsedBookDetailResponse;
  error: null;
}

export interface UsedBookDeleteAsyncSuccess {
  success: boolean;
  data: boolean;
  error: null;
}

export interface UsedBookLikeAsyncSuccess {
  success: boolean;
  data: string;
  error: null;
}

export interface UsedBookLikeGetAsyncSuccess {
  success: boolean;
  data: UsedBookLikeGetResponse[];
  error: null;
}

// =========================== 썽크함수 실패 시 리턴 타입 ===========================

export interface UsedBookDetailFail {
  success: boolean;
  data: null;
  error: {
    message: string;
    status: number;
  };
}
