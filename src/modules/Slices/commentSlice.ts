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

export interface myReviewCommentProps {
  myUserId: number;
}

// 리듀가 사용할 데이터 타입
export interface commentReduceProps {
  content: getCommentProps[];
  myCommentCheck: boolean;
  myComment: getCommentProps;
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

type myCommentAsyncSuccess = getCommentProps;

// json-server로 받을 데이터
const initialState = {
  content: [],
  myCommentCheck: false,
  myComment: [],
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

// 댓글 수정
export const editComment = createAsyncThunk<myCommentAsyncSuccess, getCommentProps>(
  "comment/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await book.patch(`/content/${data.user_id}`, data);
      console.log("editComment data 데이터 확인 : ", data);
      console.log("editComment data 데이터 확인 : ", data.user_id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 나의 댓글
export const myReviewComment = createAsyncThunk<commentAsyncSuccess, myReviewCommentProps>(
  "comments/myComment",
  async (myUserId, { rejectWithValue }) => {
    try {
      const response = await book.get(`/content?user_id=${myUserId}`);
      console.log("myReviewComment data 데이터 확인 : ", myUserId);
      console.log("myReviewComment response 데이터 확인 : ", response);
      console.log("myReviewComment response 데이터 확인22 : ", response.data);

      console.log("myReviewComment response 데이터 길이 확인3 : ", response.data.length);

      if (response.data.length > 0) {
        return response.data[0];
      } else {
        return response.data;
      }
    } catch (error: any) {
      console.log(error);
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
      .addCase(addComment.fulfilled, (state, { payload }) => {
        console.log("댓글 작성 성공 fulfilled : ", payload);
        state.content.push(payload);
        state.status = "idle";
        state.myCommentCheck = true;
        state.myComment = payload;
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
        state.myCommentCheck = false;
        state.content = state.content.filter(comment => comment.id !== action.payload);
        state.myComment = state.content.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "loading";
        console.log("댓글 삭제 실패", action);
      })
      // 댓글 수정
      .addCase(editComment.pending, (state, action) => {
        console.log("댓글 수정 로딩중", action);
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        console.log("댓글 수정 성공", payload);
        state.myComment = payload;
        state.content = state.content.map(v => (v.id !== payload.id ? v : { ...v, content: payload.content }));
      })
      .addCase(editComment.rejected, (state, action) => {
        console.log("댓글 수정 성공", action);
        state.status = "loading";
      })
      // 나의 댓글
      .addCase(myReviewComment.pending, (state, action) => {
        console.log("나의 댓글 로딩중", action);
        state.status = "loading";
      })
      .addCase(myReviewComment.fulfilled, (state, { payload }) => {
        console.log("나의 댓글 통신 성공 : ", payload);
        state.myComment = payload;
        state.status = "idle";
      })
      .addCase(myReviewComment.rejected, (state, action) => {
        console.log("나의 댓글 실패", action);
        state.status = "loading";
      });
  },
});

export const commentsSelector = (state: RootState) => state.commentReduce;
export const comments = (state: RootState) => state.commentReduce.content;
export const myComment = (state: RootState) => state.commentReduce.myComment;
export const myCommentCheck = (state: RootState) => state.commentReduce.myCommentCheck;

export default commentSlice.reducer;
