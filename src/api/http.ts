import axios, { AxiosError } from "axios";
import { removeToken } from "utils/localStorageUtil";
import * as Types from "./types";

const RESPONSE_STATUS_ENUM: { [key: number]: string } = {
  400: "클라이언트에서 잘못된 요청을 보냈습니다.",
  403: "권한이 없습니다.",
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
  response => response,
  (error: AxiosError<Types.ErrorResponse>) => {
    const { response } = error;

    if (response) {
      let isHandling = false;
      /*
        형태로 서버에서 응답이 온다면 서버에서 핸들링한 응답이라고 본다.
        {
          data:"",
          error:"",
          succes:"",
        }
      */
      Object.entries(response.data).forEach(([key, value]) => {
        if (key === "data") isHandling = true;
        if (key === "error" && value instanceof Object) isHandling = true;
        if (key === "success") isHandling = true;
      });

      if (response.status === 403) removeToken();

      if (isHandling) {
        const { error } = response.data;
        console.log("핸들링된 에러입니다.", error.status);
        return Promise.reject(new Error(error.message));
      }
      // 2. 서버에서 비핸들링된 응답
      const { status } = response;
      console.log("비 핸들링된 에러입니다.", status);
      return Promise.reject(new Error(RESPONSE_STATUS_ENUM[status]));
    }

    return Promise.reject(new Error(RESPONSE_STATUS_ENUM[504]));
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
  } else if (error.message) {
    message = error.message;
  } else if (typeof error === "string") {
    message = error;
  }

  return message;
};

export const makeAuthTokenHeader = (token: string) => ({
  headers: { "X-AUTH-TOKEN": token },
});

export default http;
