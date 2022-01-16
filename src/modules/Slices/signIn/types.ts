import { History } from "history";
import { AppDispatch } from "modules/store";
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
export interface IUserInfo {
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
  data: IUserInfo;
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
  data: IUserInfo;
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

// =========================== ThunkApi 제네릭 ===========================
// 리듀가 사용할 데이터 타입
export interface ISignInReduce {
  user: IUserInfo | null;
  token: string | null;
  isLoggedIn: boolean;
  status: "loading" | "idle";
  error: null | ErrorHandlring | string;
}
