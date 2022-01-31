import { AxiosResponse } from "axios";
import { Response } from "pages/Order/types";
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

export type CategoryResourceType = ResourceType;
export type UsedBookResourceType = ResourceType | undefined;

export type KeyEvent = React.KeyboardEvent<HTMLInputElement>;
export type SaleInsertFormProps = {
  bookId?: string;
  handlePopupMessage: (isSuccess: boolean, message: string) => void;
  categoryResource: CategoryResourceType;
  usedBookResource: UsedBookResourceType;
};

export interface SaleBeforeImgProps {
  usedBookResource: ResourceType;
}
export interface SaleInsertProps {
  control: Control<SaleInsertForm, object>;
  errors: {
    title?: FieldError | undefined;
    price?: FieldError | undefined;
  };
}
export interface SaleInsertEditorProps {
  setEditorValue: (value: string) => void;
  editorValue: string;
}
