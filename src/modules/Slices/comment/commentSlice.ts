import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/modules/store";
import http from "src/api/http";
import { ReviewsParams } from "src/components/Reviews/ReviewForm/types";
import {
  commentAsyncSuccess,
  myCommentAsyncSuccess,
  deleteCommentProps,
  CommentId,
  commentReduceProps,
  addCommentProps,
  editCommentProps,
} from "./types";

const initialState: commentReduceProps = {
  content: [],
  myCommentCheck: false,
  myComment: null,
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 4,
    paged: true,
    unpaged: false,
  },
  status: "loading",
  error: null,
};

const name = "comments";

// 댓글 리스트
export const reviewCommentList = createAsyncThunk<commentAsyncSuccess, ReviewsParams>(
  `${name}/commentList`,
  async ({ bookId, id }, { rejectWithValue }) => {
    try {
      if (id === undefined) {
        const response = await http.get(`/book-review/${bookId}`);
        return response.data;
      }
      const response = await http.get(`/book-review/${bookId}?userId=${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 작성
export const addComment = createAsyncThunk<myCommentAsyncSuccess, addCommentProps>(
  `${name}/create`,
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
export const deleteComment = createAsyncThunk(
  `${name}/delete`,
  async ({ id }: deleteCommentProps, { rejectWithValue }) => {
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
  `${name}/edit`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.put(`/book-review`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 나의 댓글
export const myReviewComment = createAsyncThunk<myCommentAsyncSuccess, ReviewsParams>(
  `${name}/myComment`,
  async ({ bookId, id }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/book-review/my/${bookId}?userId=${id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 좋아요 추가 및 삭제하기
export const commentLike = createAsyncThunk<CommentId, CommentId>(`${name}/like`, async (data, { rejectWithValue }) => {
  try {
    await http.post(`/book-review/like/`, data);
    return data;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

const commentSlice = createSlice({
  name: "commentReduce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 댓글 불러오기
      .addCase(reviewCommentList.pending, state => {
        state.status = "loading";
      })
      .addCase(reviewCommentList.fulfilled, (state, { payload }) => {
        state.content = payload.data.content;
        state.status = "success";
        state.myCommentCheck = payload.data.myCommentCheck;
      })
      .addCase(reviewCommentList.rejected, state => {
        state.status = "failed";
      })
      // 댓글 작성
      .addCase(addComment.pending, state => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.content.push(payload.data);
        state.status = "success";
        state.myComment = payload.data;
      })
      .addCase(addComment.rejected, state => {
        state.status = "failed";
      })
      // 댓글 삭제
      .addCase(deleteComment.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = state.content.filter(comment => comment.reviewId !== payload);
        state.myComment = null;
        state.myCommentCheck = false;
      })
      .addCase(deleteComment.rejected, state => {
        state.status = "failed";
      })
      // 댓글 수정
      .addCase(editComment.pending, state => {
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const { content, rating, reviewId, reviewDate } = data;
        state.myComment = data;
        state.status = "success";
        state.content = state.content.map(v => (v.reviewId !== reviewId ? v : { ...v, content, rating, reviewDate }));
      })
      .addCase(editComment.rejected, state => {
        state.status = "failed";
      })
      // 나의 댓글
      .addCase(myReviewComment.pending, state => {
        state.status = "loading";
      })
      .addCase(myReviewComment.fulfilled, (state, { payload }) => {
        state.myComment = payload.data;
        state.status = "success";
      })
      .addCase(myReviewComment.rejected, state => {
        state.status = "failed";
      })
      // 댓글 좋아요 추가 및 취소
      .addCase(commentLike.pending, state => {
        state.status = "loading";
      })
      .addCase(commentLike.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = state.content.map(v =>
          v.reviewId !== payload.reviewId ? v : { ...v, reviewLikeCount: v.reviewLikeCount + 1, likeCheck: true },
        );
      })
      .addCase(commentLike.rejected, state => {
        state.status = "failed";
      });
  },
});

export const commentsSelector = (state: RootState) => state.commentReduce;
export const comments = (state: RootState) => state.commentReduce.content;
export const myComment = (state: RootState) => state.commentReduce.myComment;
export const myCommentCheck = (state: RootState) => state.commentReduce.myCommentCheck;
export default commentSlice;
