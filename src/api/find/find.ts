import http from "../http";

export const getFindEmail = <T, P>(payload: P) => {
  return http.post<T>("user/find/id", payload);
};

export const getFindPassword = <T, P>(payload: P) => {
  return http.post<T>("user/find/password", payload);
};
