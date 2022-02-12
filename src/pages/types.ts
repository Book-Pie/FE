import { SuccessResponse } from "api/types";

export interface OauthParam {
  name: "naver" | "kakao";
}
export interface Param {
  id: string;
}
export interface KakaoPayload {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}

export interface ShopParam {
  shopId: string;
}

export interface UsedBook {
  bookState: string;
  content: string;
  fstCategory: string;
  images: string[];
  modifiedDate: string;
  price: number;
  saleState: "SOLD_OUT" | "TRADING" | "SALE";
  sellerId: number;
  sellerName: string;
  sndCategory: string;
  tags: string[];
  title: string;
  uploadDate: string;
  usedBookId: number;
  view: number;
}
export interface UsedBookResponse extends SuccessResponse {
  data: UsedBook;
}
export interface OauthAccessTokenResponse extends SuccessResponse {
  data: string;
}
export type LocationState = {
  usedBookId: string;
  sellerId: string;
  buyerId: string;
};
