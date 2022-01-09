export interface bookSliceProps {
  bookId: number;
  user: number;
  content: string;
  replyDate: string;
}

// 통신 실패 시 반환하는 타입
export interface bookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 통신 성공 시 반환하는 타입
export interface bookAsyncSuccess {
  success: boolean;
  data: string;
  error: null;
}

// 썽크함수가 사용하는 api 타입
export interface ThunkApi {
  extra: {
    history: History;
  };
  rejectValue: bookAsyncFail;
}

export const name = "book";
