import { History } from "history";
import { AppDispatch, RootState } from "modules/store";
import { IOrderResult } from "components/OrderForm/types";

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
  isRemember: boolean;
}
export interface NickNameUpdateParam {
  nickName: string;
  token: string;
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
export type SaleInfoAsyncSuccess = IOrderResult;
export type BuyInfoAsyncSuccess = IOrderResult;
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
export interface SignInAsyncRequest {
  email: string;
  password: string;
}
export interface SignInAsyncResponse {
  success: boolean;
  data: string;
  error: null;
}
export interface UserInfoAsyncResponse {
  data: UserInfo;
  error: null;
  success: boolean;
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
  saleInfos: IOrderResult[];
  buyInfos: IOrderResult[];
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
