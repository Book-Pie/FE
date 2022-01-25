import { addUserReviewSubmitParam } from "src/components/BuyList/types";

export interface addUserReviewData {
  orderId: number;
  content: string;
  rating: number;
}

export interface deleteUserReviewParam {
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

export interface getUserReceivedReviewListData {
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

// 성공 데이터
export interface addUserReviewParam {
  data: addUserReviewSubmitParam;
  token: string;
}

export interface addUserReviewAsyncSuccess {
  success: boolean;
  data: number;
  error: string;
}

export interface getUserReviewListAsyncSuccess {
  success: boolean;
  data: {
    pageCount: number;
    pages: getUserReceivedReviewListData[];
  };
  error: string;
}

export interface deleteUserReviewAsyncSuccess {
  success: boolean;
  data: boolean;
  error: string;
}
