import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "modules/store";
import http from "src/api/http";
import { makeTwoDimensionalArray } from "src/components/BookReviewList/BookReviewList";
import { BookListReduceProps, GetBookAsyncFail, GetBookAsyncSuccess, GetCategoryAsyncSuccess } from "./types";

const name = "bookReduce";

const initialState: BookListReduceProps = {
  bestSellerItem: [],
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
export const getBestSeller = createAsyncThunk<GetBookAsyncSuccess>(
  `${name}/bestSeller`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get("/book/bestseller?page=1&size=9");
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 카테고리 리스트
export const getCategoryList = createAsyncThunk<GetCategoryAsyncSuccess>(
  `${name}/getCategoryList`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/book/category`);
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

// Slice
export const getBookSlice = createSlice({
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
      // 베스트셀러
      .addCase(getBestSeller.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getBestSeller.fulfilled, (state, { payload }) => {
        state.bestSellerItem = payload.data.item;
        state.status = "idle";
      })
      .addCase(getBestSeller.rejected, (state, { payload }) => {
        console.log("error");
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
        console.log("error");
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
        console.log("error");
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      });
  },
});
export const bestSellerItemSelector = ({ bookListReduce }: RootState) => bookListReduce.bestSellerItem;
export const getBookSelector = (state: RootState) => state.bookListReduce;
export const getBookItemList = (state: RootState) => state.bookListReduce.item;
export const { setListInit } = getBookSlice.actions;
export default getBookSlice;
