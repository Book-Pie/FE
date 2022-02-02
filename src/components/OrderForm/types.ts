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
export interface OrderRequest {
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

export interface BuyInfoAsyncResponse extends SuccessResponse {
  data: OrderResult;
}
