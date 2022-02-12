import { GetUserReceivedReviewListData } from "modules/Slices/userReview/types";
import { Dispatch } from "react";
import { UserReduce } from "src/modules/Slices/user/types";

export interface ReceivedReviewList {
  pageCount: number;
  pages: GetUserReceivedReviewListData[];
  page: number;
  isEmpty: boolean;
}

export interface UserReviewContentProps {
  contents: GetUserReceivedReviewListData[];
}

export interface ReceivedReviewListAxiosResponse {
  success: boolean;
  data: {
    pageCount: number;
    pages: GetUserReceivedReviewListData[];
  };
  error: null;
}

export interface WrittedReviewListProps {
  contents: GetUserReceivedReviewListData[];
  dispatch: Dispatch<any>;
  signIn: UserReduce;
}
