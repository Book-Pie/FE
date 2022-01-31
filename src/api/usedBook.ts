import http, { makeAuthTokenHeader } from "api/http";

export const getCategorys = <T>() => http.get<T>("/usedbook/category");
export const getUsedBooks = <T>(query: string) => http.get<T>(`/usedbook?${query}`);
export const getUsedBook = <T>(id: string) => http.get<T>(`/usedbook/${id}`);
export const getLatestUsedBooks = () => http.get("/usedbook?limit=15");
export const getSearchUsedBooks = (query: string) => http.get(`/usedbook${query}&limit=8`);
export const getSales = <T>(query: string) => http.get<T>(`usedbook/user?${query}`);
// 판매글을 최신상태로 올린다.
export const getUsedbooLatestUp = (bookId: number) => http.put(`/usedbook/date/${bookId}`);
export const getSaleInsert = (formData: FormData, token: string) =>
  http.post("/usedbook/", formData, makeAuthTokenHeader(token));
export const getSaleUpdate = (formData: FormData, token: string, bookId: string) =>
  http.put(`/usedbook/${bookId}`, formData, makeAuthTokenHeader(token));
