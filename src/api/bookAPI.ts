import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:4000`,
});

export default api;

// 알라딘 API 요청 (CORB 해결 필요)

// const API_KEY = "ttbminw70921526001";
// const BASE_PATH = "https://www.aladin.co.kr/ttb/api/ItemList.aspx";

// export function getBookData() {
//   return axios
//     .get(
//       `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbminw70921526001&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101`,
//     )
//     .then(response => console.log(response))
//     .catch(error => console.error(error));
// }
