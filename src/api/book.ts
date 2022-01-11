import axios from "axios";

export const book = axios.create({
  // json-server 테스트용 주소
  // baseURL: "http://localhost:3001",
  // 실제 api
  baseURL: "http://bookpie.tk:8080",
});
