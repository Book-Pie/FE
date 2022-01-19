import { History } from "history";
import { AppDispatch, RootState } from "src/modules/store";

export interface InsertThunkApi {
  dispatch: AppDispatch;
  state: RootState;
  extra: {
    history: History;
  };
  rejectValue: string;
}

export interface IInsertRequest {
  title: string;
  content: string;
  boardType: string;
  userId: number;
}

export interface Content {
  boardId: number;
  title: string;
  content: string;
  price: number;
  boardType: string;
  userId: number;
  nickName: string;
  boardDate: string;
  view: number;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface List {
  content: Content[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  number: number;
  sort: Sort;
  size: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface Contents {
  [key: number]: Content[];
}
interface B {
  [key: number]: Content;
}

export interface IFreeBoardReduce {
  status: "loading" | "idle";
  error: string | null;
  list: {
    page: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    empty: boolean;
    contents: Contents;
    size: number;
  } | null;
  info: Content | null;
}
