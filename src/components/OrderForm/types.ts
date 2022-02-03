import { UsedBook } from "pages/types";
import { SuccessResponse } from "src/api/types";

export interface OrderFormProps {
  usedBook: UsedBook;
}
export interface IOrderForm {
  detailAddress: string;
  mainAddress: string;
  postalCode: string;
}
export interface OrderPayload {
  usedBookId: number;
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string;
  };
  deliveryRequest: string;
}

export interface OrderResult {
  orderId: number;
  orderDate: string;
  buyer: {
    userId: number;
    nickName: string;
    name: string;
    address: {
      postalCode: string;
      mainAddress: string;
      detailAddress: string;
    } | null;
    phone: string;
  };
  seller: {
    userId: number;
    nickName: string;
    name: string;
    address: {
      postalCode: string;
      mainAddress: string;
      detailAddress: string;
    } | null;
    phone: string;
  };
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
