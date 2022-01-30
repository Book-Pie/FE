import qeuryString from "query-string";
import http from "./http";

export const getFreeboardInsert = <P>(payLoad: P) => http.post("/board", payLoad);
export const getFreeboards = (page: string | number, size = 5) => {
  const query = qeuryString.stringify({ page, boardType: "FREE", size });
  return http.get(`/board/getAll?${query}`);
};
export const getFreeboard = (boardId: string) => http.get(`/board/${boardId}`);
export const getFreeboardDelete = (boardId: string) => http.delete(`/board/${boardId}`);
export const getFreeboardUpdate = <P>(payload: P) => http.put("/board", payload);
export const getFreeboardsByTitle = (page: string | number, keyWord: string, size = 5) => {
  const query = qeuryString.stringify({ page, boardType: "FREE", size, keyWord });
  return http.get(`/board/search?${query}`);
};

export const getFreeboardComments = (boardId: string | number, page: number, size = 5) => {
  const query = qeuryString.stringify({ page, size });
  return http.get(`/reply/board/${boardId}?${query}`);
};
export const getFreeboardCommentInsert = <P>(payload: P) => http.post("/reply/board", payload);
export const getFreeboardCommentDelet = (replyId: number) => http.delete(`/reply/board/${replyId}`);
export const getFreeboardCommentUpdate = <P>(payload: P) => http.put("/reply/board", payload);
export const getSubReplyInsert = <P>(payload: P) => http.post("/reply", payload);
export const getSubReplyDelete = (subReplyId: number) => http.delete(`/reply/${subReplyId}`);
export const getSubReplyUpdate = <P>(payload: P) => http.put("/reply", payload);
