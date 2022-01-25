export interface IParam {
  id: string;
}
export interface IUsedBook {
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
export interface AxiosResponse {
  seuccess: boolean;
  data: IUsedBook;
  error: null;
}
