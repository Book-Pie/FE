import axios from "axios";

export default axios.create({
  // json-server 테스트용 주소
  baseURL: "http://localhost:3001",
  // 실제 api
  // baseURL: "http://bookpie.tk:8080",
});
