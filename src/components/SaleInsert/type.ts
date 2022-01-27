export interface SaleInsertForm {
  title: string;
  price: string;
}

export type CheckBoxType = {
  [key: string]: boolean;
};

export type TagsType = {
  tags: Set<string>;
};

export type KeyEvent = React.KeyboardEvent<HTMLInputElement>;
