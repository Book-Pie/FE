export interface IParam {
  name: "naver" | "kakao";
}
export interface IKakaoRequest {
  grant_type: string;
  client_id: string;
  redirect_uri: string;
  code: string;
}
