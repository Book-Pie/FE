import { GetUserReceivedReviewListData } from "modules/Slices/userReview/types";

export interface ReceivedReviewList {
  pageCount: number;
  pages: GetUserReceivedReviewListData[];
  page: number;
  isEmpty: boolean;
}

export interface ReceivedReviewListAxiosResponse {
  success: boolean;
  data: {
    pageCount: number;
    pages: GetUserReceivedReviewListData[];
  };
  error: null;
}
