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
