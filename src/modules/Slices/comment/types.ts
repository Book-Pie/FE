import { AppDispatch } from "modules/store";

export interface myReviewCommentProps {
  myUserId: number;
}

export interface ErrorHandling {
  status: number;
  message: string;
}

export interface addCommentProps {
  data: {
    isbn: string;
    content: string;
    rating: number;
    category: string;
  };
  token: string;
}

export interface EditCommentProps {
  data: {
    reviewId: number;
    content: string;
    rating: number;
    category: string;
  };
  token: string;
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
  token: string;
}

export interface commentListProps {
  bookId: number;
}

export interface BestCommentProps {
  bookId: string;
}

export interface CommentId {
  reviewId: number;
  token: string;
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
  averageRating: number;
  totalPages: number;
  pageable: pageableProps;
  content: getCommentProps[];
  first: boolean;
  totalElements: number;
  empty: boolean;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  myCommentCheck: boolean | null;
  myComment: getCommentProps | null;
  bestComment: getCommentProps[];
  last: boolean;
  averageRating: number;
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
export interface CommentLikeSuccess {
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
export interface MyCommentAsyncSuccess {
  success: boolean;
  data: getCommentProps;
  error: null;
}

// 베스트 댓글
export interface BestCommentAsyncSuccess {
  success: boolean;
  data: getCommentProps[];
  error: null;
}
