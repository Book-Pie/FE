import { IUsedBook } from "pages/UsedBook/types";

export type StateEnumType = {
  SALE: string;
  SOLD_OUT: string;
  TRADING: string;
};

export interface UsedBookCardProps {
  card: IUsedBook;
}
