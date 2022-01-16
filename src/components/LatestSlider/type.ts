export type StateEnumType = {
  SALE: string;
  TRADING: string;
  SOLE_OUT: string;
};

export interface CardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  state: keyof StateEnumType;
}
