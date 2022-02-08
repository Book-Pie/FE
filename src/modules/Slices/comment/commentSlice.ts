import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "modules/store";
import http from "api/http";
import { MyReviewCommentParam, ReviewsParams } from "components/Reviews/ReviewForm/types";
import {
  commentAsyncSuccess,
  MyCommentAsyncSuccess,
  deleteCommentProps,
  CommentId,
  commentReduceProps,
  addCommentProps,
  EditCommentProps,
  CommentLikeSuccess,
  BestCommentAsyncSuccess,
  BestCommentProps,
} from "./types";

const initialState: commentReduceProps = {
  content: [],
  myCommentCheck: false,
  myComment: null,
  bestComment: [],
  last: false,
  totalPages: 0,
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
  first: false,
  totalElements: 0,
  empty: false,
  status: "loading",
  error: null,
};

const name = "comments";

// 댓글 리스트
export const reviewCommentList = createAsyncThunk<commentAsyncSuccess, ReviewsParams>(
  `${name}/commentList`,
  async ({ bookId, query, token }, { rejectWithValue }) => {
    try {
      if (token === undefined) {
        const response = await http.get(`/book-review/${bookId}?&${query}`);
        return response.data;
      }
      if (token !== undefined) {
        const response = await http.get(`/book-review/${bookId}?&${query}`, {
          headers: { "X-AUTH-TOKEN": token },
        });
        return response.data;
      }
      return false;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 작성
export const addComment = createAsyncThunk<MyCommentAsyncSuccess, addCommentProps>(
  `${name}/create`,
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/book-review/`, data, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 삭제하기
export const deleteComment = createAsyncThunk(
  `${name}/delete`,
  async ({ id, token }: deleteCommentProps, { rejectWithValue }) => {
    try {
      await http.delete(`/book-review/${id}`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return id;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 수정
export const editComment = createAsyncThunk<MyCommentAsyncSuccess, EditCommentProps>(
  `${name}/edit`,
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/book-review`, data, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 나의 댓글
export const myReviewComment = createAsyncThunk<MyCommentAsyncSuccess, MyReviewCommentParam>(
  `${name}/myComment`,
  async ({ bookId, token }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/book-review/my/${bookId}`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 댓글 좋아요 추가 및 삭제하기
export const commentLike = createAsyncThunk<CommentLikeSuccess, CommentId>(
  `${name}/like`,
  async ({ reviewId, token }, { rejectWithValue }) => {
    try {
      const response = await http.post(
        `/book-review/like`,
        { reviewId },
        {
          headers: { "X-AUTH-TOKEN": token },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 베스트 댓글
export const reviewBestComment = createAsyncThunk<BestCommentAsyncSuccess, BestCommentProps>(
  `${name}/bestComment`,
  async ({ bookId }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/book-review/bestReview/${bookId}`);
      return response.data;
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
      // 댓글 불러오기
      .addCase(reviewCommentList.pending, state => {
        state.status = "loading";
      })
      .addCase(reviewCommentList.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const { content, empty, first, last, myCommentCheck, pageable, totalPages, totalElements } = data;
        state.content = content;
        state.totalPages = totalPages;
        state.totalElements = totalElements;
        state.pageable = pageable;
        state.first = first;
        state.last = last;
        state.empty = empty;
        state.status = "success";
        state.myCommentCheck = myCommentCheck;
      })
      .addCase(reviewCommentList.rejected, state => {
        state.status = "failed";
      })
      // 댓글 작성
      .addCase(addComment.pending, state => {
        state.status = "loading";
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.content.unshift(payload.data);
        state.status = "success";
        state.myComment = payload.data;
        state.myCommentCheck = true;
        state.totalElements += 1;
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
        state.totalElements -= 1;
      })
      .addCase(deleteComment.rejected, state => {
        state.status = "failed";
      })
      // 댓글 수정
      .addCase(editComment.pending, state => {
        state.status = "loading";
      })
      .addCase(editComment.fulfilled, (state, { payload }) => {
        state.status = "success";
        const { data } = payload;
        const { content, rating, reviewId, reviewDate } = data;
        state.content = state.content.map(v => (v.reviewId !== reviewId ? v : { ...v, content, rating, reviewDate }));
        state.myComment = data;
        state.myCommentCheck = true;
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
        const { check, reviewId } = payload.data;
        if (check) {
          state.content = state.content.map(v =>
            v.reviewId !== reviewId ? v : { ...v, reviewLikeCount: v.reviewLikeCount + 1 },
          );
          state.bestComment = state.bestComment.map(v =>
            v.reviewId !== reviewId ? v : { ...v, reviewLikeCount: v.reviewLikeCount + 1 },
          );
        } else {
          state.content = state.content.map(v =>
            v.reviewId !== reviewId ? v : { ...v, reviewLikeCount: v.reviewLikeCount - 1 },
          );
          state.bestComment = state.bestComment.map(v =>
            v.reviewId !== reviewId ? v : { ...v, reviewLikeCount: v.reviewLikeCount - 1 },
          );
        }
      })
      .addCase(commentLike.rejected, state => {
        state.status = "failed";
      })
      // 베스트 댓글
      .addCase(reviewBestComment.pending, state => {
        state.status = "loading";
      })
      .addCase(reviewBestComment.fulfilled, (state, { payload }) => {
        state.bestComment = payload.data;
        state.status = "success";
      })
      .addCase(reviewBestComment.rejected, state => {
        state.status = "failed";
      });
  },
});

export const commentsSelector = (state: RootState) => state.commentReduce;
export const comments = (state: RootState) => state.commentReduce.content;
export const myComment = (state: RootState) => state.commentReduce.myComment;
export const myCommentCheck = (state: RootState) => state.commentReduce.myCommentCheck;
export default commentSlice;
