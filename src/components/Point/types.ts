export interface Point {
  pointId: number;
  userId: number;
  amount: number;
  cancelAmount: number;
  impUid: string;
  merchantUid: string;
  orderDate: string;
}

export type PointState = Point[];
export type CheckBoxStateType = { [key: string]: boolean };
export type Request = {
  userId: number;
  pointId: number;
  cancelAmount: number;
};
