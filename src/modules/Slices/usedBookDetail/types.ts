import { AppDispatch } from "modules/store";
import { UserReviewData } from "../userReview/types";

export interface UsedBookDetailThunk {
  dispatch: AppDispatch;
  rejectValue: string;
}

export interface GetUsedBookBuyConfirmParam {
  orderId: string;
  token: string;
}

export interface UsedBookDetailReplyListParam {
  usedBookId: number | string;
  page: number;
}

export interface GetUsedBookBuyListParam {
  id: number;
  token: string;
}

export interface DeleteUsedBookDetailParam {
  id: number;
}

export interface AddUsedBookDetailReplyParam {
  usedBookId: number;
  userId: number;
  content: string;
  secret: boolean;
}

export interface editUsedBookDetailReplyParam {
  userId: number;
  replyId: number;
  content: string;
  secret: boolean;
}

export interface UsedBookLikeParam {
  usedBookId: number;
}

export interface UsedBookBuyListResponse {
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

export interface ModalItemParam {
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
  // 추가
  userReviewId: number;
  buyerName: string;
  sellerName: string;
  content: string;
  rating: number;
  reviewDate: string;
  usedBookTitle: string;
}

export interface UsedBookDetailReplyResponse {
  replyId: number;
  parentReplyId: number | null;
  usedBookId: number;
  userId: number;
  content: string;
  replyDate: string;
  nickName: string;
  secret: boolean;
  subReply: [];
}

export interface BuyBookList {
  pageCount: number;
  pages: UsedBookBuyListResponse[];
  page: number;
  isEmpty: boolean;
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
  content: UsedBookDetailReplyResponse[];
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

export interface UsedBookDetailReduce {
  content: UsedBookDetailResponse;
  replyList: UsedBookDetailReplyResponse[];
  likeList: PagesResponse[];
  buyList: UsedBookBuyListResponse[];
  relatedUsedBookList: PagesResponse[];
  list: BuyBookList;
  storeReviewList: UserReviewData[];
  pageCount: number;
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  status: "loading" | "success" | "failed";
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
  data: {
    pageCount: number;
    pages: UsedBookBuyListResponse[];
  };
  error: null;
}

export interface AddUsedBookDetailReplyAsyncSuccess {
  success: boolean;
  data: UsedBookDetailReplyResponse;
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
