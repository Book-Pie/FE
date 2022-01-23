import { History } from "history";
import { AppDispatch, RootState } from "src/modules/store";

export interface IListByTitleRequest {
  keyWord: string;
  page: number | string;
}

export interface ThunkApi {
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

export interface IUpdateRequest {
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

export interface IComment {
  replyId: number;
  parentReplyId: number;
  boardId: number;
  userId: number;
  content: string;
  replyDate: string;
  nickName: string;
  subReply: SubReply[];
}

export interface Comment {
  page: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  empty: boolean;
  size: number;
  contents: IComment[][];
}

export interface CommentReponse {
  content: IComment[];
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

export interface Comments {
  boardId: number;
  comments: CommentReponse;
  isReload?: boolean;
}

export interface Contents {
  [key: number]: Content[];
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
  keyWord: string | null;
  coList: { [key: number]: Comment } | null;
}

export interface InsertPayload {
  boardId: number | string;
  content: string;
  userId: number;
}

export interface UpdatePayload {
  replyId: number | string;
  userId: number;
  content: string;
}
export interface ICommentListRequest {
  boardId: string | number;
  page: number;
  isReload?: boolean;
}
export interface DeletePayload {
  replyId: number;
  boardId: number | string;
}

export interface SubReplyInsertPayload {
  userId: number | string;
  parentReplyId: number;
  content: string;
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
export interface SubReplyUpdatePayload {
  userId: number | string;
  content: string;
  replyId: number;
}

export interface SubReplyUpdateParam {
  boardId: string;
  payload: SubReplyUpdatePayload;
}
