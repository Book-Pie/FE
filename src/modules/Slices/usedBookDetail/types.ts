import { AppDispatch } from "src/modules/store";

export interface UsedBookDetailThunk {
  dispatch: AppDispatch;
  rejectValue: string;
}

export interface getUsedBookBuyConfirmParam {
  orderId: string;
  token: string;
}

export interface getUsedBookBuyListParam {
  id: number;
  token: string;
}

export interface deleteUsedBookDetailParam {
  id: number;
}

export interface addUsedBookDetailReplyParam {
  usedBookId: number;
  userId: number;
  content: string;
}

export interface usedBookLikeParam {
  usedBookId: number;
}

export interface usedBookBuyListResponse {
  orderId: string;
  bookId?: number;
  reviewId: number;
  title: string;
  image: string;
  price: number;
  state: string;
  orderDate: string;
  sellerNickName: string;
  buyerNickName: string;
}

export interface usedBookDetailReplyResponse {
  replyId: number;
  parentReplyId: number;
  usedBookId: number;
  userId: number;
  content: string;
  replyDate: string;
  nickName: string;
}

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
  likeCount: string | number;
  replyCount: number;
  tags: string[];
  images: string[];
}

export interface UsedBookLikeGetResponse {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface usedBookDetailReplyListData {
  content: usedBookDetailReplyResponse[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface MyUsedBookAsyncSuccess {
  success: boolean;
  data: {
    pageCount: number;
    pages: PagesResponse[];
  };
  error: null;
}

// =========================== 썽크함수 성공 시 리턴 타입 ===========================

export interface getUsedBookLikeListAsyncSuccess {
  success: boolean;
  data: PagesResponse[];
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

export interface UsedBookViewAsyncSuccess {
  success: boolean;
  data: number;
  error: null;
}

export interface UsedBookLikeGetAsyncSuccess {
  success: boolean;
  data: UsedBookLikeGetResponse[];
  error: null;
}

export interface usedBookDetailReplyListAsyncSuccess {
  success: boolean;
  data: usedBookDetailReplyListData;
  error: null;
}

export interface getUsedBookBuyListAsyncSuccess {
  success: boolean;
  data: usedBookBuyListResponse[];
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
