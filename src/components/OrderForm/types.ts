import { UsedBook } from "pages/types";
import { SuccessResponse } from "api/types";

export interface OrderFormProps {
  usedBook: UsedBook;
}
export interface OrderForm {
  detailAddress: string;
  mainAddress: string;
  postalCode: string;
}

export type AddressType = {
  postalCode: string;
  mainAddress: string;
  detailAddress: string;
};

export type SellerBuyerType = {
  userId: number;
  nickName: string;
  name: string;
  address: AddressType | null;
  phone: string | null;
};

export interface OrderPayload {
  usedBookId: number;
  address: AddressType;
  deliveryRequest: string;
}

export interface OrderResult {
  orderId: number;
  orderDate: string;
  buyer: SellerBuyerType;
  seller: SellerBuyerType;
  book: {
    bookId: number;
    title: string;
    price: number;
    image: string;
  };
  deliveryRequest: string;
}

export interface BuyInfoResponse extends SuccessResponse {
  data: OrderResult;
}
export interface OrderResponse extends SuccessResponse {
  data: OrderResult;
}
