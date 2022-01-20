import axios, { AxiosError } from "axios";
import { removeToken } from "src/utils/localStorageUtil";
import * as Types from "./types";

const RESPONSE_STATUS_ENUM: Types.ResponseEnumType = {
  400: "클라이언트에서 잘못된 요청을 보냈습니다.",
  403: "유효하지 않는 토큰값입니다. 다시 로그인해주세요.",
  404: "유효하지 않는 자원입니다.",
  500: "서버에서 문제가 발생했습니다.",
  504: "타임 아웃이 발생했습니다.",
};

const baseURL = process.env.BASE_URL;

const http = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

// 서버에서 응답이 왔을때
http.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;

    if (response) {
      let isHandling = false;

      Object.entries(response.data).forEach(([key, value]) => {
        if (key === "data") isHandling = true;
        if (key === "error" && value instanceof Object) isHandling = true;
        if (key === "success") isHandling = true;
      });

      if (response.status === 403) removeToken();

      // 1. 서버에서 핸들링된 응답
      if (isHandling) {
        const { error } = response.data;
        console.error("핸들링된 에러입니다.", error.status);
        return Promise.reject(new Error(error.message));
      }
      // 2. 서버에서 비핸들링된 응답
      if (!isHandling) {
        const { status } = response;
        console.error("비 핸들링된 에러입니다.", status);
        return Promise.reject(new Error(RESPONSE_STATUS_ENUM[status]));
      }
    }

    return Promise.reject(new Error("인터셉터 클라이언트 에러입니다."));
  },
);

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
      const data = error.response.data as Types.ErrorResponse;

      // 상태코드 500이상부터
      if (status >= 500) {
        message = "서버에서 문제가 발생했습니다.";
      } else if (status >= 400) {
        message = "클라이언트에서 잘못된 요청을 보냈습니다.";
        if (data.error.message) message = data.error.message;
      }
    }
  } else if (error.message) message = error.message;

  return message;
};

export default http;
