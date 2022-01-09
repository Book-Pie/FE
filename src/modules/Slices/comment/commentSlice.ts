import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/modules/store";
import book from "src/api/book";
import { getCommentProps, commentAsyncSuccess, myCommentAsyncSuccess, deleteCommentProps } from "./types";

// json-server로 받을 데이터
const initialState = {
  content: [] as any,
  myCommentCheck: false,
  myComment: {},
  status: "loading",
  error: null,
};

// 댓글 리스트
export const reviewCommentList = createAsyncThunk<commentAsyncSuccess>(
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
      // 실제 api 주소 post
      // const response = await book.post(`api/book-review/create`, data);
      // 테스트용 주소
      const response = await book.post(`/content`, data);

      return response.data;
    } catch (error: any) {
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
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 삭제하기
export const deleteComment = createAsyncThunk(
  "comment/delete",
  async (data: deleteCommentProps, { rejectWithValue }) => {
    try {
      await book.delete(`/content/${data.id}`);
      // await axios.delete(`/api/book-review/delete/${id}`);
      return data.id;
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
      const response = await book.patch(`/content/${data.userId}`, data);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 나의 댓글
export const myReviewComment = createAsyncThunk<commentAsyncSuccess, number>(
  "comments/myComment",
  async (myUserId, { rejectWithValue }) => {
    try {
      const response = await book.get(`/content?userId=${myUserId}`);

      if (response.data.length > 0) {
        return response.data[0];
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

const commentSlice = createSlice({
  name: "commentReduce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 포스트 불러오기
      .addCase(reviewCommentList.pending, state => {
        state.status = "loading";
      })
      .addCase(reviewCommentList.fulfilled, (state, { payload }) => {
        state.content = payload;
        state.status = "success";
      })
      .addCase(reviewCommentList.rejected, state => {
        state.status = "failed";
      })
      // 댓글 작성
      .addCase(addComment.pending, state => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.content.push(payload);
        state.status = "success";
        state.myCommentCheck = true;
        state.myComment = payload;
      })
      .addCase(addComment.rejected, state => {
        state.status = "failed";
      })
      // 댓글 삭제
      .addCase(deleteComment.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "success";
        state.myCommentCheck = false;
        state.content = state.content.filter((comment: { id: number }) => comment.id !== action.payload);
        state.myComment = state.content.filter((comment: { id: number }) => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, state => {
        state.status = "failed";
      })
      // 댓글 수정
      .addCase(editComment.pending, state => {
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        state.myComment = payload;
        state.status = "success";
        state.content = state.content.map((v: { id: number }) =>
          v.id !== payload.id ? v : { ...v, content: payload.content },
        );
      })
      .addCase(editComment.rejected, state => {
        state.status = "failed";
      })
      // 나의 댓글
      .addCase(myReviewComment.pending, state => {
        state.status = "loading";
      })
      .addCase(myReviewComment.fulfilled, (state, { payload }) => {
        state.myComment = payload;
        state.status = "success";
      })
      .addCase(myReviewComment.rejected, state => {
        state.status = "failed";
      });
  },
});

export const commentsSelector = (state: RootState) => state.commentReduce;
export const comments = (state: RootState) => state.commentReduce.content;
export const myComment = (state: RootState) => state.commentReduce.myComment;
export const myCommentCheck = (state: RootState) => state.commentReduce.myCommentCheck;

export default commentSlice;
