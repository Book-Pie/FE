import http from "../http";

export const withDrawal = <T, P>(payload: P, token: string) => {
  return http.delete<T>("/user/me", {
    data: payload,
    headers: { "X-AUTH-TOKEN": token },
  });
};
