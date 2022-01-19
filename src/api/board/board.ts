import qeuryString from "query-string";
import http from "../http";

export const boardInsert = <P>(payLoad: P) => {
  return http.post("/board", payLoad);
};

export const boardList = (page: string, size = 5) => {
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
