import { AddUserReviewSubmitParam } from "components/BuyList/types";
import { ReceivedReviewList } from "src/components/UserReview/types";
import { AppDispatch } from "src/modules/store";
import { ErrorHandling } from "../comment/types";
import { PagesResponse } from "../usedBookDetail/types";

export interface GetRelatedUsedBookListParam {
  category: string;
  tags: string[];
}

export interface GetStoreUserReviewListParam {
  sellerId: number;
  page: number;
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

export interface GetFollowerUserListData {
  followId: number;
  userId: number;
  nickName: string;
  profile: string;
  followCheck: boolean;
}
export type FollowType = "follow" | "follower" | "shopTop";

export interface FollowNewData {
  newData: {
    userId: number;
    type: FollowType;
  };
}

export interface AddMyPageStoreFollowParam {
  data: {
    userId: number;
  };
  token: string;
  type: FollowType;
}

export interface DeleteMyPageStoreFollowParam {
  id: number;
  token: string;
  type: FollowType;
}

export interface AddStoreFollowParam {
  data: {
    userId: number;
  };
  token: string;
}

export interface DeleteStoreFollowParam {
  id: number;
  token: string;
}

export interface FollowCheckParam {
  id: number;
  token: string;
}

export interface AddUserReviewParam {
  data: AddUserReviewSubmitParam;
  token: string;
}

export interface EditUserReviewParam {
  data: EditUserReviewSubmitData;
  token: string;
}

export interface DeleteUsedBookLikeParam {
  checkItems: number[];
  token: string;
}

export interface usedBookListParam {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: string;
  modifiedDate: string;
  state: string;
  likeCount: number;
  replyCount: number;
}

export interface GetMyFollowingUserListData {
  followId: number;
  userId: number;
  profile: string;
  nickName: string;
  usedBookList: usedBookListParam[];
  followCheck: boolean;
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

export interface DeleteUsedBookLikeAsyncSuccess {
  success: boolean;
  data: boolean;
  error: string;
}

export interface CountCheckStoreFollowAsyncSuccess {
  success: boolean;
  data: {
    follower: number;
    following: number;
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

export interface GetUserReviewListParam {
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

export interface GetFollowerUserListAsyncSuccess {
  success: boolean;
  data: GetFollowerUserListData[];
  error: string;
}

export interface GetMyFollowingUserListAsyncSuccess {
  success: boolean;
  data: GetMyFollowingUserListData[];
  error: string;
}

export interface UserReviewInfo {
  userReviewList: GetUserReceivedReviewListData[];
  receivedReviewList: GetUserReceivedReviewListData[];
  myPageChart: GetChartResponse[];
  list: ReceivedReviewList;
  status: "loading" | "success" | "failed";
  error: null | ErrorHandling;
}
