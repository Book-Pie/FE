import { UsedBookDetailReplyResponse } from "src/modules/Slices/usedBookDetail/types";

export interface UsedBookReplyListParam {
  review: UsedBookDetailReplyResponse;
  sellerId: number;
  sellerName: string;
  idx: number;
  page: number;
}
