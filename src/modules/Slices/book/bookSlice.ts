import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "modules/store";
import { getBestSeller } from "api/book";
import http from "api/http";
import { makeTwoDimensionalArray } from "components/BookReviewList/BookReviewList";
import { paramProps } from "src/components/BookDetail/types";
import { BookReduce, GetBookAsyncFail, GetBookAsyncSuccess, BookAsyncFail, BookAsyncSuccess } from "./types";

const name = "bookReduce";

const initialState: BookReduce = {
  content: {
    success: false,
    data: {
      item: [],
    },
    error: null,
  },
  bestSeller: [],
  status: "loading",
  error: null,
  item: [],
  list: {
    pages: [],
    pageCount: 1,
    isEmpty: false,
  },
};

// 베스트셀러
export const bestSellerAsync = createAsyncThunk<GetBookAsyncSuccess>(
  `${name}/bestSeller`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getBestSeller();
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 기본 리뷰 리스트
export const getDefaultBookList = createAsyncThunk<GetBookAsyncSuccess, number>(
  `${name}/defaultBookList`,
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/book/byCategory?categoryId=74&page=${page}`);
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 무한 스크롤 카테고리
export const getReviewBook = createAsyncThunk<GetBookAsyncSuccess, string>(
  `${name}/getReviewBook`,
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/book/byCategory?${query}&size=16`);
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

export const bookDetailAsync = createAsyncThunk<BookAsyncSuccess, paramProps>(
  `${name}/bookDetailAsync`,
  async ({ isbn13 }, { rejectWithValue }) => {
    try {
      const response = await http.get(`book/${isbn13}`);
      const { data } = response;
      const { success } = data;
      if (!success) {
        if (data.error.code === 200) {
          return console.log(data);
        }
      }
      return data;
    } catch (err) {
      const error = err as AxiosError<BookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// Slice
export const bookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {
    setListInit: state => {
      state.list.isEmpty = false;
      state.list.pageCount = 1;
      state.list.pages = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(bestSellerAsync.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(bestSellerAsync.fulfilled, (state, { payload }) => {
        state.bestSeller = payload.data.item;
        state.status = "idle";
      })
      .addCase(bestSellerAsync.rejected, (state, { payload }) => {
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      })
      // 카테고리 리스트
      .addCase(getDefaultBookList.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getDefaultBookList.fulfilled, (state, { payload }) => {
        const { item } = payload.data;
        const array = makeTwoDimensionalArray(item);
        if (state.list.pages.length === 0) {
          state.list.pages = array;
        } else {
          state.list.pages = [...state.list.pages, ...array];
        }
        state.status = "idle";
      })
      .addCase(getDefaultBookList.rejected, (state, { payload }) => {
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      })
      // 무한 스크롤 카테고리 리스트
      .addCase(getReviewBook.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getReviewBook.fulfilled, (state, { payload }) => {
        const { item } = payload.data;
        const array = makeTwoDimensionalArray(item);
        if (state.list.pages.length === 0) {
          state.list.pages = array;
        } else {
          state.list.pages = [...state.list.pages, ...array];
        }
        state.status = "idle";
      })
      .addCase(getReviewBook.rejected, (state, { payload }) => {
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      })
      .addCase(bookDetailAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = payload;
      })
      .addCase(bookDetailAsync.rejected, state => {
        state.status = "failed";
      });
  },
});
export const bestSellerSelector = ({ bookReduce }: RootState) => bookReduce.bestSeller;
export const bookReduceSelector = ({ bookReduce }: RootState) => bookReduce;
export const { setListInit } = bookSlice.actions;
export default bookSlice;
