import { AppDispatch, RootState } from "modules/store";

export interface getCommentProps {
  id: number;
  reviewId?: number;
  userId?: number;
  nickname?: string;
  content: string;
  rating: number;
  reviewLikeCount?: number;
  reviewDate?: string;
  likeCheck?: boolean;
}

export interface myReviewCommentProps {
  myUserId: number;
}

export interface ErrorHandling {
  status: number;
  message: string;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  content: getCommentProps[] | null;
  myCommentCheck: boolean;
  myComment: getCommentProps | null;
  status: "loading" | "success" | "failed";
  error: null | ErrorHandling;
}

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

export interface CommentId {
  commentId: any;
  id: number;
}
