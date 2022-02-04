import http, { makeAuthTokenHeader } from "api/http";

export const getPasswordCheck = <T, P>(payload: P, token: string) =>
  http.post<T>("/user/password", payload, makeAuthTokenHeader(token));

export const getPasswordChange = <T, P>(payload: P, token: string) =>
  http.put<T>("/user/password", payload, makeAuthTokenHeader(token));

export const getUserInfoUpdate = <T, P>(payload: P, token: string) =>
  http.put<T>("/user/me", payload, makeAuthTokenHeader(token));

export const getUserProfileImgUpload = (formData: FormData, token: string) => {
  return http.post("/user/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "X-AUTH-TOKEN": token,
    },
  });
};
export const getUserWithDrawal = <P>(payload: P, token: string) => {
  return http.delete("/user/me", {
    data: payload,
    headers: { "X-AUTH-TOKEN": token },
  });
};

export const getUserPoints = (userId: number) => http.get(`/point/${userId}`);
export const getUserPointCancel = <P>(payload: P) => http.post("/point", payload);
export const getNickNameDuplicateCheck = <T>(nickName: string) => http.get<T>(`/user/nickname/${nickName}`);
export const getEmailDuplicateCheck = <T>(email: string) => http.get<T>(`/user/email/${email}`);
export const getSignUp = <P>(payload: P) => http.post("/user/signup", payload);
export const getFindEmail = <P>(payload: P) => http.post("user/find/email", payload);
export const getFindPassword = <P>(payload: P) => http.post("user/find/password", payload);
