import { SelectChangeEvent } from "@mui/material";
import { AxiosResponse } from "axios";
import { Response } from "pages/types";
import { Control, FieldError } from "react-hook-form";

export interface SaleInsertForm {
  title: string;
  price: string;
}

export type UsedBookResponseType = Response;

export type CheckBoxType = {
  [key: string]: boolean;
};

export type TagsType = {
  tags: Set<string>;
};
type ResourceType = {
  read: <T>() => AxiosResponse<T>;
};

export type KeyEvent = React.KeyboardEvent<HTMLInputElement>;
export type SaleInsertFormProps = {
  bookId?: string;
  handlePopupMessage: (isSuccess: boolean, message: string) => void;
  categoryResource: ResourceType;
  usedBookResource: ResourceType | undefined;
};

export interface SaleBeforeImgProps {
  usedBookResource: ResourceType;
}
export interface SaleInsertPriceProps {
  control: Control<SaleInsertForm, object>;
  error?: FieldError | undefined;
  usedBookResource: ResourceType | undefined;
}
export interface SaleInsertTitleProps {
  control: Control<SaleInsertForm, object>;
  error?: FieldError | undefined;
  usedBookResource: ResourceType | undefined;
}
export interface SaleInsertEditorProps {
  setEditorValue: (value: string) => void;
  usedBookResource: ResourceType | undefined;
}

export interface SaleInsertCategorysProps {
  categoryResource: ResourceType;
  currentFirstCategory: string;
  currentSecondCategory: string;
  handleChange: (firstCategory: string) => (event: SelectChangeEvent) => void;
}
