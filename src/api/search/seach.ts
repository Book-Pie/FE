import http from "../http";
import * as Types from "./types";

export const getSearchUsedBooks = (query: string) => {
  return http.get<Types.UsedBooksResponse>(`/usedbook${query}&limit=8`);
};

export const getSearchAladinBooks = (query: string) => {
  return http.get<Types.AladinResponse>(`/book/search?${query}&size=8`);
};
