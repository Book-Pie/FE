import { History } from "history";
import { AppDispatch, RootState } from "modules/store";
import { SuccessResponse } from "api/types";

export interface ThunkApi {
  dispatch: AppDispatch;
  state: RootState;
  extra: {
    history: History;
  };
  rejectValue: string;
}

export interface FreeboardInsertAsyncPayload {
  title: string;
  content: string;
  boardType: string;
  userId: number;
}

export interface FreeboardUpdateAsyncPayload {
  title: string;
  content: string;
  boardType: string;
  boardId: string;
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

export interface SubReply {
  replyId: number;
  parentReplyId: number;
  userId: number;
  content: string;
  replyDate: string;
  nickName: string;
  secret: boolean;
}

interface Pageable {
  sort: Sort;
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Freeboards {
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

interface Comment {
  replyId: number;
  parentReplyId: number;
  boardId: number;
  userId: number;
  content: string;
  replyDate: string;
  nickName: string;
  subReply: SubReply[];
}

export interface Comments {
  page: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
  size: number;
  contents: Comment[][];
}

export interface FreeboardCommentsAsyncSuccess {
  boardId: number;
  comments: {
    content: Comment[];
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
  };
  isReload?: boolean;
}

export interface Contents {
  [key: number]: Content[];
}

export interface FreeBoardReduce {
  status: "loading" | "idle";
  error: string | null;
  info: Content | null;
  keyWord: string | null;
  list: {
    page: number;
    totalPages: number;
    last: boolean;
    first: boolean;
    empty: boolean;
    contents: Contents;
    size: number;
  } | null;
  coList: { [key: number]: Comments } | null;
}

export interface FreeboardInsertParam {
  boardId: number | string;
  content: string;
  userId: number;
}

export interface FreeboardUpdateParam {
  replyId: number | string;
  userId: number;
  content: string;
}
export interface FreeboardDeleteParam {
  replyId: number;
  boardId: number | string;
}
export interface FreeboardCommentsParam {
  boardId: string | number;
  page: number;
  isReload?: boolean;
}

export interface SubReplyInsertParam {
  boardId: string;
  payload: {
    userId: number | string;
    parentReplyId: number;
    content: string;
  };
}

export interface SubReplyDeleteParam {
  boardId: string;
  subReplyId: number;
}

export interface SubReplyUpdateParam {
  boardId: string;
  payload: {
    userId: number | string;
    replyId: number;
    content: string;
  };
}

export interface FreeboardInsertResponse extends SuccessResponse {}
export interface FreeboardUpdateResponse extends SuccessResponse {}
