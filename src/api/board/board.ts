import qeuryString from "query-string";
import http from "../http";

export const boardInsert = <P>(payLoad: P) => {
  return http.post("/board", payLoad);
};

export const boardList = (page: string | number, size = 5) => {
  const query = qeuryString.stringify({ page, boardType: "FREE", size });
  return http.get(`/board/getAll?${query}`);
};

export const getBoard = (boardId: string) => {
  return http.get(`/board/${boardId}`);
};

export const boardDelete = (boardId: string) => {
  return http.delete(`/board/${boardId}`);
};

export const boardUpdate = <P>(payload: P) => {
  return http.put("/board", payload);
};

export const boardListByTitle = (page: string | number, keyWord: string, size = 5) => {
  const query = qeuryString.stringify({ page, boardType: "FREE", size, keyWord });
  return http.get(`/board/search?${query}`);
};

export const commentList = (boardId: string | number, page: number, size = 5) => {
  const query = qeuryString.stringify({ page, size });
  return http.get(`/reply/board/${boardId}?${query}`);
};
export const commentInsert = <P>(payload: P) => {
  return http.post("/reply/board", payload);
};
export const commentDelet = (replyId: number) => {
  return http.delete(`/reply/board/${replyId}`);
};
export const commentUpdate = <P>(payload: P) => {
  return http.put("/reply/board", payload);
};
