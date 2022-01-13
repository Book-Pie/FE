import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/modules/store";
import http from "src/api/http";
import {
  getCommentProps,
  commentAsyncSuccess,
  myCommentAsyncSuccess,
  deleteCommentProps,
  CommentId,
  commentReduceProps,
  commentListProps,
  commentSuccess,
  addCommentProps,
  editCommentProps,
} from "./types";

const initialState: commentReduceProps = {
  content: [],
  // myCommentCheck: false,
  // myComment: null,
  status: "loading",
  error: null,
};

// 댓글 리스트
export const reviewCommentList = createAsyncThunk<commentAsyncSuccess, commentListProps>(
  "comments/commentLoad",
  async ({ bookId, myUserId }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/book-review/${bookId}?&userId=${myUserId}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 작성
export const addComment = createAsyncThunk<commentAsyncSuccess, addCommentProps>(
  "/api/book-review/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post(`/book-review/`, data);

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
export const deleteComment = createAsyncThunk<commentSuccess, deleteCommentProps>(
  "comment/delete",
  async ({ id }, { rejectWithValue }) => {
    try {
      await http.delete(`/book-review/${id}`);
      // await axios.delete(`/api/book-review/delete/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 수정
export const editComment = createAsyncThunk<myCommentAsyncSuccess, editCommentProps>(
  "comment/edit",
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.patch(`/content/${data.userId}`, data);

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
      const response = await http.get(`/content?userId=${myUserId}`);

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

// 댓글 좋아요 추가 및 삭제하기
export const commentLike = createAsyncThunk<commentSuccess, CommentId>(
  "/comments/like",
  async (data, { rejectWithValue }) => {
    try {
      await http.post(`/book-review/like/${data}`, data);

      return data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 좋아요 취소하기
export const commentUnLike = createAsyncThunk<commentSuccess, CommentId>(
  "/comments/unlike",
  async (data, { rejectWithValue }) => {
    try {
      await http.patch(`/content/${data}`, data);
      return data;
    } catch (error: any) {
      console.error(error);
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
        state.content.data.content.push(payload.data);
        state.status = "success";
        // state.myCommentCheck = true;
        // state.myComment = payload;
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
        state.content.data.content = state.content.data.content.filter(comment => comment.reviewId !== action.payload);
        // state.myCommentCheck = false;
        // state.myComment = state.content.filter((comment: { id: number }) => comment.id !== action.payload);
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
          v.id !== payload.id
            ? v
            : { ...v, content: payload.content, rating: payload.rating, reviewDate: payload.reviewDate },
        );
      })
      .addCase(editComment.rejected, (state, action) => {
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
      })
      // 댓글 좋아요
      .addCase(commentLike.pending, state => {
        state.status = "loading";
      })
      .addCase(commentLike.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = state.content.map(v =>
          v.id !== payload.id ? v : { ...v, reviewLikeCount: v.reviewLikeCount + 1, likeCheck: true },
        );
      })
      .addCase(commentLike.rejected, state => {
        state.status = "failed";
      })
      // 댓글 좋아요 삭제
      .addCase(commentUnLike.pending, state => {
        state.status = "loading";
      })
      .addCase(commentUnLike.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = state.content.map(v =>
          v.id !== payload.id ? v : { ...v, reviewLikeCount: v.reviewLikeCount - 1, likeCheck: false },
        );
      })
      .addCase(commentUnLike.rejected, state => {
        state.status = "failed";
      });
  },
});

export const commentsSelector = (state: RootState) => state.commentReduce;
export const comments = (state: RootState) => state.commentReduce.content;
export const myComment = (state: RootState) => state.commentReduce.myComment;
export const likeCount = (state: RootState) => state.commentReduce.content.reviewLikeCount;
export const myCommentCheck = (state: RootState) => state.commentReduce.myCommentCheck;

export default commentSlice;
