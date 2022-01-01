import http from "../http";

export const getFindId = <T, P>(payload: P) => {
  return http.post<T>("user/find/id", payload);
};

export const getFindPassword = <T, P>(payload: P) => {
  return http.post<T>("user/find/password", payload);
};
