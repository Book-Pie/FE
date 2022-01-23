import { addUserReviewSubmitParam } from "src/components/BuyList/types";

export interface addUserReviewData {
  orderId: number;
  content: string;
  rating: number;
}

export interface addUserReviewParam {
  data: addUserReviewSubmitParam;
  token: string;
}

export interface addUserReviewAsyncSuccess {
  success: boolean;
  data: number;
  error: string;
}
