import axios, { AxiosError, AxiosRequestConfig } from "axios";
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

const client = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

client.interceptors.response.use(
  response => response,
  (error: AxiosError<Types.ErrorResponse>) => {
    // response가 없는 경우는 타임아웃 발생했을 때 이다.
    if (!error.response) return Promise.reject(makeError(RESPONSE_STATUS_ENUM[504]));

    let isHandling = false;
    const { response } = error;
    const { data, status } = response;
    if (status === 403) removeToken();

    /*
      형태로 서버에서 응답이 온다면 서버에서 핸들링한 응답이라고 본다.
      {
        data:"",
        error:{},
        succes:"",
      }
      */
    if (data?.error && data.error instanceof Object) isHandling = true;
    if (data?.success) isHandling = true;
    if (data?.data) isHandling = true;

    console.log(`상태`, isHandling ? data.error.status : status);
    console.log(`메세지 ${isHandling ? data.error.message : RESPONSE_STATUS_ENUM[status]}`);

    // 1.서버에서 핸들링된 응답 2.서버에서 비핸들링된 응답
    return Promise.reject(makeError(isHandling ? data.error.message : RESPONSE_STATUS_ENUM[status]));
  },
);

const makeError = (message: string) => new Error(message);

export const errorHandler = (error: any) => {
  // 런타임 오류는 유저한테는 노출되면 안되고 유저는 에러를 인지 할 수 있도록 에러페이지로 이동 시켜줘야된다.
  return error?.message || error || "클라이언트에서 오류가 발생 했습니다.";
};

export const makeAuthTokenHeader = (token: string): AxiosRequestConfig => ({
  headers: { "X-AUTH-TOKEN": token },
});
export const makeKaKaoOauthHeader = (): AxiosRequestConfig => ({
  headers: { "Content-type": "application/x-www-form-urlencoded;charset=utf-8" },
});

export const makeFormDataHeader = (token: string): AxiosRequestConfig => ({
  headers: {
    "Content-Type": "multipart/form-data",
    "X-AUTH-TOKEN": token,
  },
});

/* 
 비동기 작업이 한번일 때 불필요하게 함수를 async로 만들 수고가 없어진다.
 비동기작업이 여러개라면 프로미스 체인으로 처리하거나 비동기작업을 하는 메소드 안에서 async로 동기적으로 실행하면된다.
*/
export default {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await client.get(url, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
  async post<P, R = void>(url: string, body?: P, config?: AxiosRequestConfig): Promise<R> {
    try {
      const res = await client.post(url, body, config);

      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await client.delete(url, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },

  async put<P, R = void>(url: string, body: P, config?: AxiosRequestConfig): Promise<R> {
    try {
      const res = await client.put(url, body, config);
      return res.data;
    } catch (e) {
      throw new Error(errorHandler(e));
    }
  },
};

export const createResource = <T>(promise: Promise<T>) => {
  let status: "success" | "pending" | "error" = "pending";
  let result: T;

  const suspender = promise
    .then(resolved => {
      status = "success";
      result = resolved;
      return resolved;
    })
    .catch(rejected => {
      status = "error";
      result = rejected;
      return rejected;
    });

  return {
    read() {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      if (status === "success") return result;
      throw new Error("This should be impossible");
    },
  };
};

export const handleResourceCache = (
  cache: Types.CacheRefType,
  url: string,
  name: string,
  promise: (url: string) => Promise<any>,
) => {
  const lowerName = name.toLowerCase();
  let resource = cache[lowerName];
  if (!resource) {
    resource = createResource(promise(url));
    cache[lowerName] = resource;
  }
  return resource;
};
