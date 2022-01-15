import axios from "axios";
import http from "../http";

export const kakaoOauth = (query: string) => {
  return axios.post("https://kauth.kakao.com/oauth/token", query, {
    headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
  });
};

export const kakaoOauthAccessToken = (token: string) => {
  return http.get(`/oauth/login/kakao/${token}`);
};

export const naverOauthAccessToken = (quey: string) => {
  return http.get(`/oauth/login/naver?${quey}`);
};

export const getSignIn = <T, P>(payload: P) => {
  return http.post<T>("/user/login", payload);
};

export const getNickNameDuplicateCheck = <T>(nickName: string) => {
  return http.get<T>(`/user/nickname/${nickName}`);
};

export const getEmailDuplicateCheck = <T>(email: string) => {
  return http.get<T>(`/user/email/${email}`);
};

export const getSignUp = <T, P>(payload: P) => {
  return http.post<T>("/user/signup", payload);
};

export const getFindEmail = <P>(payload: P) => {
  return http.post("user/find/email", payload);
};

export const getFindPassword = <P>(payload: P) => {
  return http.post("user/find/password", payload);
};
