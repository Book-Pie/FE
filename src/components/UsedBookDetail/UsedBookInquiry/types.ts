import { UsedBookDetailReplyResponse, UsedBookDetailSubReplyResponse } from "src/modules/Slices/usedBookDetail/types";

export interface UsedBookReplyListParam {
  review: UsedBookDetailReplyResponse;
  sellerId: number;
  sellerName: string;
  idx: number;
  page: number;
}

export interface submitParam {
  usedBookId: number;
  userId: number;
  content: string;
}

export interface SubReplyParam {
  sx: {
    width: string;
    fontSize: string;
    padding: string;
    right: string;
  };
  sellerName: string;
  subReply?: UsedBookDetailSubReplyResponse;
  replyId: number;
  isSubReplyAdd?: boolean;
  sellerId: number;
  page: number;
}
