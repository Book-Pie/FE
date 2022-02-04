import { SubReply } from "modules/Slices/freeBoard/types";

export interface Param {
  boardId: string;
}
export interface LocationState {
  paginatoionPage: number;
}

export interface CommentsProps {
  boardId: string;
  userId?: number;
}

export interface CommentProps {
  currentUpdateReplyId: number;
  handleReplyOnClick: (
    v: number,
    type: "update" | "delete" | "replyUpdate" | "subRely",
    value?: string,
    valueLength?: number,
  ) => () => void;
  content: string;
  nickName: string;
  replyDate: string;
  replyId: number;
  userId: number | undefined;
  subReply: SubReply[];
  isMakeUser: boolean;
}

export interface SubReplyProps {
  isMakeUser: boolean;
  content: string;
  nickName: string;
  replyDate: string;
  replyId: number;
  userId: number | undefined;
}
