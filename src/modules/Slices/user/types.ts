import { History } from "history";
import { AppDispatch, RootState } from "modules/store";
import { OrderResult } from "components/OrderForm/types";
import { SuccessResponse } from "api/types";

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

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export type Review = {
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

export interface BuyInfoAsyncResponse extends SuccessResponse {
  data: OrderResult;
}
export interface SaleInfoAsyncResponse extends SuccessResponse {
  data: OrderResult;
}
export interface SignInAsyncResponse extends SuccessResponse {
  data: string;
}
export interface UserInfoAsyncResponse extends SuccessResponse {
  data: UserInfo;
}
export interface ReviewAsyncReponse extends SuccessResponse {
  data: Review;
}

// =========================== ThunkApi 제네릭 ===========================
export interface ThunkApi {
  dispatch: AppDispatch;
  extra: { history: History };
  rejectValue: string;
  state: RootState;
}

export interface UserReduce {
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
