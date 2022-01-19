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

// http://3.34.100.122:8080/api/board/search?keyWord=변&page=0&boardType=FREE
export const boardListByTitle = (page: string | number, keyWord: string, size = 5) => {
  const query = qeuryString.stringify({ page, boardType: "FREE", size, keyWord });
  console.log("서버로 보내는 query ===> ", query);
  return http.get(`/board/search?${query}`);
};
