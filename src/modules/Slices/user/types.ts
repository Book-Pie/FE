import { History } from "history";
import { AppDispatch, RootState } from "modules/store";
import { OrderResult } from "components/OrderForm/types";
import { SuccessResponse } from "src/api/types";

export interface Content {
  reviewId: number;
  isbn: string;
  userId: number;
  content: string;
  rating: number;
  nickName: string;
  reviewLikeCount: number;
  reviewDate: string;
  likeCheck: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

// =========================== 썽크함수 파라미터 타입 ===========================

export interface SignInAsyncParam {
  email: string;
  password: string;
}
// =========================== 썽크함수 파라미터 타입 ===========================

// =========================== 썽크함수 성공 시 리턴 타입 ===========================

export interface UserInfo {
  id: number;
  email: string;
  nickName: string;
  name: string;
  phone: string | null;
  grade: string;
  rating: number;
  loginType: "LOCAL" | "KAKAO" | "NAVER";
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string;
  } | null;
  point: {
    totalPoint: number;
    usedPoint: number;
    holdPoint: number;
  };
  image: null | string;
  createDate: string;
}
export type UserInfoAsyncSuccess = UserInfo;
export type SaleInfoAsyncResponse = {
  sucess: boolean;
  data: OrderResult;
  error: null;
};
export type ReviewListAsyncSuccess = {
  content: Content[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  sort: Sort;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
};
// =========================== 썽크함수 성공 시 리턴 타입 ===========================

// =========================== axios 요청 제네릭 ===========================
export interface SignInAsyncRequestBodoy {
  email: string;
  password: string;
}
export interface BuyInfoAsyncResponse extends SuccessResponse {
  data: OrderResult;
}
export interface SignInAsyncResponse extends SuccessResponse {
  data: string;
}
export interface UserInfoAsyncResponse extends SuccessResponse {
  data: UserInfo;
}

// =========================== ThunkApi 제네릭 ===========================
export interface ThunkApi {
  dispatch: AppDispatch;
  extra: { history: History };
  rejectValue: string;
  state: RootState;
}

export interface SignInReduce {
  user: UserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
  status: "loading" | "idle";
  error: null | string;
  saleInfos: OrderResult[];
  buyInfos: OrderResult[];
  reviews: {
    page: number;
    pageCount: number;
    contents: Content[][] | null;
    empty: boolean;
    size: number;
    status: "loading" | "idle";
    error: string | null;
  };
}
