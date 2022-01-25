import { getUserReceivedReviewListData } from "src/modules/Slices/userReview/types";

export interface ReceivedReviewList {
  pageCount: number;
  pages: getUserReceivedReviewListData[];
  page: number;
  isEmpty: boolean;
}

export interface ReceivedReviewListAxiosResponse {
  success: boolean;
  data: {
    pageCount: number;
    pages: getUserReceivedReviewListData[];
  };
  error: null;
}
