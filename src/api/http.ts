import axios, { AxiosRequestConfig } from "axios";
import { getAccessToken } from "src/utils/localStorageUtil";

const baseURL = process.env.BASE_URL !== "production" ? "http://localhost:3000/api/" : "http://bookpie.tk:8080/api";

const http = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 2000,
});

const requsetSuccess = (config: AxiosRequestConfig) => {
  const accessToken = getAccessToken();
  if (accessToken && config.headers) config.headers["X-AUTH-TOKEN"] = accessToken;
  return config;
};

http.interceptors.request.use(requsetSuccess);

export const errorHandler = (error: any) => {
  // 런타임 오류
  let message = "클라이언트에서 오류가 발생 했습니다.";

  // axios 에러 처리
  // 여기에 if문에 걸리지 않는다면 런타임 에러이다.
  if (axios.isAxiosError(error)) {
    message = "요청 중간 오류가 발생했습니다.";

    // 서버가 죽어있어서 응답을 받지 못했을때
    if (error.request) {
      message = "요청이 이루어 졌으나 응답을 받지 못했습니다.";
    }
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    if (error.response) {
      const { status } = error.response;

      // 상태코드 500이상부터
      if (status >= 500) {
        message = "서버에서 문제가 발생했습니다.";
      }
      // 상태코드 500보다 작고 400이상부터
      if (status < 500 && status >= 400) {
        message = "잘못된 요청을 보냈습니다.";
      }
    }
  }
  return message;
};

export default http;
