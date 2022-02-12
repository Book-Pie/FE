import { addUserReviewSubmitParam } from "components/BuyList/types";
import { ReceivedReviewList } from "src/components/UserReview/types";
import { AppDispatch } from "src/modules/store";
import { ErrorHandling } from "../comment/types";
import { PagesResponse } from "../usedBookDetail/types";

export interface GetRelatedUsedBookListParam {
  category: string;
  tags: string[];
}

export interface getStoreUserReviewListParam {
  sellerId: number;
  page: number;
}

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
  buyerImage: string;
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

export interface ThunkApi {
  dispatch: AppDispatch;
  rejectValue: string;
}

// 대댓글
export interface AddUsedBookDetailSubReplyParam {
  userId: number;
  parentReplyId: number;
  content: string;
  usedBookId: number;
  page: number;
}

export interface EditUsedBookDetailSubReply {
  replyId: number;
  content: string;
  usedBookId: number;
  page: number;
}

export interface EditUsedBookDetailSubReplyParam {
  replyId: number;
  content: string;
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

export interface GetRelatedUsedBookListAsyncSuccess {
  success: boolean;
  data: PagesResponse[];
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

export interface GetStoreUserReviewAsyncSuccess {
  success: boolean;
  data: {
    pageCount: number;
    pages: UserReviewData[];
    totalElement: number;
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

// 대댓글 성공
export interface AddUsedBookDetailSubReplyAsyncSuccess {
  success: boolean;
  data: {
    replyId: number;
    parentReplyId: number;
    userId: number;
    content: string;
    replyDate: string;
    nickName: string;
    secret: boolean;
  };
  error: string;
}

export interface GetChartResponse {
  id: string;
  label: string;
  value: number;
}

export interface GetChartAsyncSuccess {
  success: boolean;
  data: GetChartResponse[];
  error: string;
}

export interface userReviewInfo {
  userReviewList: GetUserReceivedReviewListData[];
  receivedReviewList: GetUserReceivedReviewListData[];
  myPageChart: GetChartResponse[];
  list: ReceivedReviewList;
  status: "loading" | "success" | "failed";
  error: null | ErrorHandling;
}
