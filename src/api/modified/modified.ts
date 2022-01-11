import http from "../http";

const makeAuthTokenHeader = (token: string) => ({
  headers: { "X-AUTH-TOKEN": token },
});

export const passwordCheck = <T, P>(payload: P, token: string) => {
  return http.post<T>("/user/password", payload, makeAuthTokenHeader(token));
};

export const passwordChange = <T, P>(payload: P, token: string) => {
  return http.put<T>("/user/password", payload, makeAuthTokenHeader(token));
};

export const myProfileChange = <T, P>(payload: P, token: string) => {
  return http.put<T>("/user/me", payload, makeAuthTokenHeader(token));
};

export const getNickNameUpdate = (nickName: string, token: string) => {
  return http.put(`/user/nickname/${nickName}`, {}, makeAuthTokenHeader(token));
};
