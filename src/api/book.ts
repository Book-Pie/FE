import http from "./http";

export const getSearchAladinBooks = (query: string) => http.get(`/book/search?${query}&size=8`);
export const getCategoryReview = <T>() => http.get<T>("/book/category");
export const getBestSeller = () => http.get("/book/bestseller?page=1&size=9");
