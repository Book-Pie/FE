export interface ErrorHandling {
  status: number;
  message: string;
}

export interface AddCommentProps {
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

export interface GetCommentProps {
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

export interface SortProps {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface PageableProps {
  sort: SortProps;
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
}

export interface DeleteCommentProps {
  id: number;
  token: string;
}

export interface BestCommentProps {
  bookId: string;
}

export interface CommentId {
  reviewId: number;
  token: string;
}

export interface CommentLikeResponse {
  reviewLikeId: number;
  reviewId: number;
  userId: number;
  check: boolean;
}

// 통신 성공 시 반환하는 타입 데이터

export interface CommentData {
  myCommentCheck: boolean;
  last: boolean;
  averageRating: number;
  totalPages: number;
  pageable: PageableProps;
  content: GetCommentProps[];
  first: boolean;
  totalElements: number;
  empty: boolean;
}

// 리듀가 사용할 데이터 타입
export interface CommentReduceProps {
  myCommentCheck: boolean | null;
  myComment: GetCommentProps | null;
  bestComment: GetCommentProps[];
  last: boolean;
  averageRating: number;
  totalPages: number;
  pageable: PageableProps;
  content: GetCommentProps[];
  first: boolean;
  totalElements: number;
  empty: boolean;
  status: "loading" | "success" | "failed";
  error: null | ErrorHandling;
}

// 실패 했을 때
export interface CommentAsyncFail {
  status: number;
  data: any;
}

// 성공했을 때 반환 타입
export interface CommentLikeSuccess {
  success: boolean;
  data: CommentLikeResponse;
  error: null;
}

export interface CommentAsyncSuccess {
  success: boolean;
  data: CommentData;
  error: null;
}

// 나의 댓글
export interface MyCommentAsyncSuccess {
  success: boolean;
  data: GetCommentProps;
  error: null;
}

// 베스트 댓글
export interface BestCommentAsyncSuccess {
  success: boolean;
  data: GetCommentProps[];
  error: null;
}
