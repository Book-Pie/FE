import { AppDispatch } from "modules/store";

export interface getCommentProps {
  id?: number;
  reviewId?: number;
  userId?: number;
  nickname?: string;
  content?: string;
  rating: number;
  reviewLikeCount?: number;
  reviewDate?: string;
  likeCheck?: boolean;
}

export interface myReviewCommentProps {
  myUserId: number;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  content: getCommentProps[];
  myCommentCheck: boolean;
  myComment: getCommentProps;
  status: "loading" | "idle" | "error";
  error: null | {
    code: number;
    message: string;
  };
}

// 통신 실패 시 반환하는 타입
// export interface commentAsyncFail {
//   success: boolean;
//   data: null;
//   error: {
//     code: number;
//     message: string;
//   };
// }

// export interface ErrorHandling {
//   status: number;
//   message: string;
// }

// export interface IErrorMessage {
//   error: string;
//   message?: string[];
// }

export interface commentAsyncFail {
  status: number;
  data: any;
}

export interface commentThunkApi {
  dispatch: AppDispatch;
  rejectValue: commentAsyncFail;
}

export interface deleteCommentProps {
  id: number;
}

// 통신 성공 시 반환하는 타입
export type commentAsyncSuccess = getCommentProps[];

export type myCommentAsyncSuccess = getCommentProps;
