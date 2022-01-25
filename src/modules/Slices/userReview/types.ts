import { addUserReviewSubmitParam } from "src/components/BuyList/types";

export interface addUserReviewData {
  orderId: number;
  content: string;
  rating: number;
}

export interface EditUserReviewSubmitData {
  userReviewId: number;
  content: string;
  rating: number;
}

export interface DeleteUserReviewParam {
  userReviewId: number;
  token: string;
}

export interface getUserReviewListData {
  userReviewId: number;
  sellerId: number;
  sellerName: string;
  usedBookId: number;
  usedBookTitle: string;
  content: string;
  rating: number;
  reviewDate: string;
}

export interface GetUserReceivedReviewListData {
  userReviewId: number;
  sellerId: number;
  sellerName: string;
  buyerId: number;
  buyerName: string;
  usedBookId: number;
  usedBookTitle: string;
  content: string;
  rating: number;
  reviewDate: string;
}

export interface UserReviewData {
  userReviewId: number;
  sellerId: number;
  sellerName: string;
  buyerId: number;
  buyerName: string;
  usedBookId: number;
  usedBookTitle: string;
  content: string;
  rating: number;
  reviewDate: string;
  image: string;
  price: number;
}

export interface AddUserReviewParam {
  data: addUserReviewSubmitParam;
  token: string;
}

export interface EditUserReviewParam {
  data: EditUserReviewSubmitData;
  token: string;
}

// 성공 데이터
export interface AddUserReviewAsyncSuccess {
  success: boolean;
  data: {
    orderId: number;
    reviewId: number;
  };
  error: string;
}

export interface EditUserReviewAsyncSuccess {
  success: boolean;
  data: UserReviewData;
  error: string;
}

export interface GetUserReviewListAsyncSuccess {
  success: boolean;
  data: {
    pageCount: number;
    pages: GetUserReceivedReviewListData[];
  };
  error: string;
}

export interface DeleteUserReviewAsyncSuccess {
  success: boolean;
  data: number;
  error: string;
}

export interface getUserReviewListParam {
  query: string;
  token: string;
}
