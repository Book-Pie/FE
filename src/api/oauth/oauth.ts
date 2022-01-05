import axios from "axios";

export const kakaoOauth = (query: string) => {
  return axios.post("https://kauth.kakao.com/oauth/token", query, {
    headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
  });
};
