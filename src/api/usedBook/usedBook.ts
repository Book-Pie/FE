import http from "../http";

export const getCategory = <T>() => {
  return http.get<T>("/usedbook/category");
};

export const getUsedBooks = <T>(query: string) => {
  return http.get<T>(`/usedbook?${query}`);
};

export const getLatestUsedBook = () => http.get("/usedbook?limit=15");
