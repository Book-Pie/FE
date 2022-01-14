import queryStirng, { ParsedQuery } from "query-string";
import http from "../http";

export const getCategory = <T>() => {
  return http.get<T>("/usedbook/category");
};

export const getUsedBooks = <T>(page: number, query: ParsedQuery<string>) => {
  const queryStr = queryStirng.stringify(query) === "" ? "" : `&${queryStirng.stringify(query)}`;
  return http.get<T>(`/usedbook?page=${page}${queryStr}`);
};

export const getLatestUsedBook = () => http.get("/usedbook?limit=15");
