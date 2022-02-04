import { SuccessResponse } from "api/types";

export interface UsedBook {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: string;
  modifiedDate: string | null;
  state: string;
  likeCount: number;
  replyCount: number;
}

export interface SaleListState {
  pageCount: number;
  pages: UsedBook[];
  page: number;
  isEmpty: boolean;
}
export interface SaleListResponse extends SuccessResponse {
  data: {
    pageCount: number;
    pages: UsedBook[];
  };
}

export type StateEnumType = {
  [key: string]: string;
};

export interface Content {
  pages: UsedBook[];
  handleLatestClick: (id: number) => () => void;
  titleFilter: string | null;
  select: string;
}
