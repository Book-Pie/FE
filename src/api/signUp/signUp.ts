import http from "../http";

export const getNickNameDuplicateCheck = <T>(nickName: string) => {
  return http.get<T>(`/user/nickname/${nickName}`);
};

export const getEmailDuplicateCheck = <T>(email: string) => {
  return http.get<T>(`/user/email/${email}`);
};

export const getSignUp = <T, P>(payload: P) => {
  return http.post<T>("/user/signup", payload);
};
