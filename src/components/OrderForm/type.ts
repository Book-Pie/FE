import { IUsedBook } from "src/pages/Order/type";

export interface OrderFormProps {
  usedBook: IUsedBook;
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
}

export interface IOrderResult {
  orderId: number;
  orderDate: string;
  buyer: {
    userId: number;
    nickName: string;
    address: {
      postalCode: string;
      mainAddress: string;
      detailAddress: string;
    } | null;
  };
  seller: {
    userId: number;
    nickName: string;
    address: {
      postalCode: string;
      mainAddress: string;
      detailAddress: string;
    } | null;
  };
  book: {
    bookId: number;
    title: string;
    price: number;
    image: string;
  };
}
