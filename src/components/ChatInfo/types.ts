import { SuccessResponse } from "src/api/types";
import { UserInfo } from "src/modules/Slices/user/types";

export type ChattingInfo = {
  user: string;
  content: string;
  timestamp: string;
};

export type ChattingForm = {
  content: string;
};

export type State = {
  usedBookId: string;
  sellerId: string;
  buyerId: string;
};

export type ChatInfoProps = {
  user: UserInfo;
  state: State;
};

export interface Usedbook {
  usedBookId: number;
  sellerId: number;
  sellerName: string;
  price: number;
  title: string;
  content: string;
  uploadDate: Date;
  modifiedDate: Date;
  view: number;
  bookState: string;
  saleState: string;
  fstCategory: string;
  sndCategory: string;
  likeCount: number;
  replyCount: number;
  tags: string[];
  images: string[];
}

export type Historys = {
  bookId: number;
  buyerId: number;
  id: string;
  messages: ChattingInfo[];
  sellerId: number;
  topic: string;
};

export interface HistorysReponse extends SuccessResponse {
  data: Historys | null;
}

export interface UsedBookInfoReponse extends SuccessResponse {
  data: Usedbook;
}

export interface UsedbookInfoProps {
  resource: {
    read: () => UsedBookInfoReponse;
  };
}
