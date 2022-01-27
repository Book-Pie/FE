import { AppDispatch } from "modules/store";

export interface myReviewCommentProps {
  myUserId: number;
}

export interface ErrorHandling {
  status: number;
  message: string;
}

export interface addCommentProps {
  isbn: string;
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

// 통신 성공 시 반환하는 타입

export interface getCommentProps {
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

export interface deleteCommentProps {
  id: number;
}

export interface commentListProps {
  bookId: number;
}

export interface CommentId {
  reviewId: number;
  userId: number;
}

export interface commentLikeResponse {
  reviewLikeId: number;
  reviewId: number;
  userId: number;
  check: boolean;
}

// 통신 성공 시 반환하는 타입 데이터

export interface commentData {
  myCommentCheck: boolean;
  last: boolean;
  totalPages: number;
  pageable: pageableProps;
  content: getCommentProps[];
  first: boolean;
  totalElements: number;
  empty: boolean;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  myCommentCheck: boolean;
  myComment: getCommentProps | null;
  last: boolean;
  totalPages: number;
  pageable: pageableProps;
  content: getCommentProps[];
  first: boolean;
  totalElements: number;
  empty: boolean;
  status: "loading" | "success" | "failed";
  error: null | ErrorHandling;
}

// 실패 했을 때
export interface commentAsyncFail {
  status: number;
  data: any;
}

export interface commentThunkApi {
  dispatch: AppDispatch;
  rejectValue: commentAsyncFail;
}

// 성공했을 때 반환 타입
export interface commentLikeSuccess {
  success: boolean;
  data: commentLikeResponse;
  error: null;
}

export interface commentSuccess {
  success: boolean;
  data: string;
  error: null;
}

export interface commentAsyncSuccess {
  success: boolean;
  data: commentData;
  error: null;
}

// 나의 댓글
export interface myCommentAsyncSuccess {
  data: getCommentProps;
  error: null;
  success: boolean;
}
