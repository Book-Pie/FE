import http from "./http";

export const getKakaoOauth = (query: string) => {
  return http.post("https://kauth.kakao.com/oauth/token", query, {
    headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
  });
};
export const getKakaoOauthAccessToken = (token: string) => http.get(`/oauth/login/kakao/${token}`);
export const getNaverOauthAccessToken = (quey: string) => http.get(`/oauth/login/naver?${quey}`);
