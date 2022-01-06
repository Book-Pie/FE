import http from "../http";

// T : axios 응답 타입
// P : 요청 페이로드 타입
export const getSignIn = <T, P>(payload: P) => {
  return http.post<T>("/user/login", payload);
};

export const getMyProfile = <T>(token: string) => {
  return http.get<T>("/user/me", {
    headers: { "X-AUTH-TOKEN": token },
  });
};
