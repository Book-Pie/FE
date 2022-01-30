import http from "api/http";

export const getCategorys = <T>() => http.get<T>("/usedbook/category");
export const getUsedBooks = <T>(query: string) => http.get<T>(`/usedbook?${query}`);
export const getUsedBook = <T>(id: string) => http.get<T>(`/usedbook/${id}`);
export const getLatestUsedBooks = () => http.get("/usedbook?limit=15");
export const getSearchUsedBooks = (query: string) => http.get(`/usedbook${query}&limit=8`);
