import { History } from "history";
import { AppDispatch, RootState } from "modules/store";
import { IOrderResult } from "components/OrderForm/types";
// =========================== 썽크함수 파라미터 타입 ===========================
// thunk 함수로 넘겨질 인자 타입

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
export interface MyProfileSuccess {
  success: boolean;
  data: UserInfo;
  error: null;
}

export interface SignInAsyncSuccess {
  success: boolean;
  data: string;
  error: null;
}
export interface NickNameResponse {
  message: string;
}

// =========================== 썽크함수 성공 시 리턴 타입 ===========================

// =========================== 썽크함수 실패 시 리턴 타입 ===========================
export interface ErrorHandlring {
  status: number;
  message: string;
}

export interface IAxiosError {
  success: boolean;
  data: null;
  error: ErrorHandlring;
}

// =========================== 썽크함수 실패 시 리턴 타입 ===========================

// =========================== axios 제네릭 ===========================
export interface IPayload {
  email: string;
  password: string;
}
export interface IAxiosResponse {
  success: boolean;
  data: string;
  error: null;
}
export interface MyProfileResponse {
  data: UserInfo;
  error: null;
  success: boolean;
}
// =========================== axios 제네릭 ===========================

// =========================== ThunkApi 제네릭 ===========================
export interface SignInThunkApi {
  dispatch: AppDispatch;
  extra: { history: History };
  rejectValue: string;
}
export interface MyProfileThunkApi {
  dispatch: AppDispatch;
  rejectValue: string;
}

export interface NickNameUpdateThunkApi {
  dispatch: AppDispatch;
  rejectValue: NickNameResponse;
}
export interface BuyThunkApi {
  rejectValue: string;
  state: RootState;
}

export interface ThunkApi {
  rejectValue: string;
  dispatch: AppDispatch;
  state: RootState;
}

// =========================== ThunkApi 제네릭 ===========================

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

export interface ReviewListData {
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
}

export interface ISignInReduce {
  user: UserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
  status: "loading" | "idle";
  error: null | ErrorHandlring | string;
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
