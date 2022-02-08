import { SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { Control, FieldError } from "react-hook-form";

export interface SaleInsertForm {
  title: string;
  price: string;
  isbn: string;
}

export type CheckBoxType = {
  [key: string]: boolean;
};

export type TagsType = {
  tags: Set<string>;
};
type ResourceType = {
  read: <T>() => T;
};

export type KeyEvent = React.KeyboardEvent<HTMLInputElement>;
export type SaleInsertFormProps = {
  bookId?: string;
  handlePopupMessage: (isSuccess: boolean, message: string) => void;
  usedBookResource: ResourceType | undefined;
};

export interface SaleBeforeImgProps {
  usedBookResource: ResourceType | undefined;
}
export interface SaleInsertProps {
  control: Control<SaleInsertForm, object>;
  error?: FieldError | undefined;
  usedBookResource?: ResourceType;
}
export interface SaleInsertEditorProps {
  setEditorValue: (value: string) => void;
  usedBookResource: ResourceType | undefined;
}

export interface SaleInsertCategorysProps {
  currentFirstCategory: string;
  currentSecondCategory: string;
  handleChange: (firstCategory: string) => (event: SelectChangeEvent) => void;
}

export interface SaleInsertTagsProps {
  tags: Set<string>;
  setForm: Dispatch<SetStateAction<TagsType>>;
}
