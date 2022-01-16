import { AppDispatch } from "modules/store";

export interface myReviewCommentProps {
  myUserId: number;
}

export interface ErrorHandling {
  status: number;
  message: string;
}

export interface addCommentProps {
  isbn: number;
  userId: number;
  content: string;
  rating: number;
}

export interface editCommentProps {
  reviewId: number;
  userId: number;
  content: string;
  rating: number;
}

// 통신 성공 시 반환하는 타입 1

export interface getCommentProps {
  reviewId: number;
  isbn: number;
  userId: number;
  content: string;
  rating: number;
  nickname: string;
  reviewLikeCount: number;
  reviewDate: string;
  likeCheck: boolean;
}

export interface sortProps {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface pageableProps {
  sort: sortProps;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

// 통신 성공 시 반환하는 타입 데이터

export interface commentData {
  content: getCommentProps[];
  pageable: pageableProps;
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  sort: sortProps;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface commentAsyncSuccess {
  success: boolean;
  data: commentData;
  error: null;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  content: commentAsyncSuccess;
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

export interface commentListProps {
  bookId: number;
  myUserId: number;
}

export type myCommentAsyncSuccess = getCommentProps;

export interface CommentId {
  reviewId: number;
  userId: number;
}

export interface commentSuccess {
  success: boolean;
  data: string;
  error: null;
}
