import { SuccessResponse } from "src/api/types";

export interface UsedbookDetail {
  usedBookId: number;
  isbn: string;
  sellerId: number;
  sellerName: string;
  price: number;
  title: string;
  content: string;
  uploadDate: string;
  view: number;
  bookState: string;
  saleState: string;
  fstCategory: string;
  sndCategory: string;
  tags: string[];
  images: string[];
}
export interface UsedbookDetailResponse extends SuccessResponse {
  data: UsedbookDetail;
}

export interface ChatMessages {
  topic: string;
  user: string;
  content: string;
  timestamp: Date;
}

export interface ChatData {
  id: string;
  topic: string;
  bookId: number;
  sellerId: number;
  buyerId: number;
  createDate: string;
  updateDate: string;
}
export interface SellerChatListResponse extends SuccessResponse {
  data: ChatData[];
}

export interface ChatListState extends ChatData {
  bookInfo: UsedbookDetail;
}

type A = (UsedbookDetailResponse | { success: boolean; data: null; error: string })[];
export type CheckFailedType = (responses: A) => A;
