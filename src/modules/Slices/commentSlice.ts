import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import book from "../../api/book";

export interface getCommentProps {
  id: number;
  review_id: number;
  user_id: number;
  nickname: string;
  content: string;
  rating: number;
  reviewLikeCount: number;
  reviewDate: string;
  likeCheck: boolean;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  content: getCommentProps[];
  status: "loading" | "idle" | "error";
  error: null | {
    code: number;
    message: string;
  };
}

// 통신 실패 시 반환하는 타입
export interface commentAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 통신 성공 시 반환하는 타입
type commentAsyncSuccess = getCommentProps[];

// json-server로 받을 데이터
const initialState = {
  content: [],
  status: "loading",
  error: null,
};

// 댓글 리스트
export const reviewCommentList = createAsyncThunk<commentAsyncSuccess, getCommentProps>(
  "comments/commentLoad",
  async (data, { rejectWithValue }) => {
    try {
      // 실제 api 주소
      // const response = await book.get(`api/book-review/getReview/1`);
      // 테스트용 주소
      const response = await book.get(`content/`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 작성
export const addComment = createAsyncThunk<commentAsyncSuccess, getCommentProps>(
  "/api/book-review/create",
  async (data, { rejectWithValue }) => {
    try {
      console.log("addComment 댓글 작성 테스트 : ", data);
      // 실제 api 주소 post
      // const response = await book.post(`api/book-review/create`, data);
      // 테스트용 주소
      const response = await book.post(`/content`, data);
      console.log("댓글 작성 response 확인 : ", response);

      return response.data;
    } catch (error: any) {
      console.log("댓글 작성 에러 값 : ", error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          console.log(error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log("Error", error.message);
        }
        console.log(error.config);
        return rejectWithValue(error.response.data);
      }
    }
  },
);

// 댓글 삭제하기
export const deleteComment = createAsyncThunk<commentAsyncSuccess, getCommentProps>(
  "comment/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await book.delete(`/content/${id}`);
      console.log("deleteComment id 데이터 확인 : ", id);
      // const response = await axios.delete(`/api/book-review/delete/${id}`);
      console.log("deleteComment response 확인 : ", response);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

const commentSlice = createSlice({
  name: "commentReduce",
  initialState: initialState as commentReduceProps,
  reducers: {},
  extraReducers: builder => {
    console.log("createSlice 실행 확인");
    builder
      // 포스트 불러오기
      .addCase(reviewCommentList.pending, (state, action) => {
        state.status = "loading";
        console.log("댓글리스트 로딩중: ", action);
      })
      .addCase(reviewCommentList.fulfilled, (state, { payload }) => {
        console.log("댓글리스트 통신 성공 : ", payload);
        state.content = payload;
        state.status = "idle";
      })
      .addCase(reviewCommentList.rejected, (state, action) => {
        state.status = "error";
        console.log("댓글리스트 실패");
      })
      // 댓글 작성
      .addCase(addComment.pending, (state, action) => {
        state.status = "loading";
        console.log("댓글 작성 로딩중", action);
      })
      .addCase(addComment.fulfilled, (state, action) => {
        console.log("댓글 작성 extra fulfilled테스트중 : ", action);
        state.content.push(action.meta.arg);
        state.status = "idle";
        console.log("댓글 작성 성공 : ", action);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.status = "error";
        console.log("댓글 작성 실패", action);
      })
      // 댓글 삭제
      .addCase(deleteComment.pending, (state, action) => {
        state.status = "loading";
        console.log("댓글 삭제 로딩중", action);
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("댓글 삭제 성공", action);
        state.content = state.content.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "loading";
        console.log("댓글 삭제 실패", action);
      });
  },
});

export const commentsSelector = (state: RootState) => state.commentReduce;
export const comments = (state: RootState) => state.commentReduce.content;

export default commentSlice.reducer;
