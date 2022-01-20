export type StateEnumType = {
  SALE: string;
  TRADING: string;
  SOLD_OUT: string;
};

export interface CardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  state: keyof StateEnumType;
}
export interface IPage {
  id: number;
  title: string;
  price: number;
  image: string;
  uploadDate: string;
  modifiedDate: string;
  state: keyof StateEnumType;
  likeCount: number;
  replyCount: number;
}
