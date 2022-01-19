import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "modules/store";
import http from "src/api/http";
import { BookListReduceProps, getBookAsyncFail, getBookAsyncSuccess } from "./types";

const name = "bookReduce";

const initialState: BookListReduceProps = {
  item: [],
  status: "loading",
  error: null,
};

// 베스트셀러
export const getBookAPI = createAsyncThunk<getBookAsyncSuccess>(`${name}/bookAsync`, async (_, { rejectWithValue }) => {
  try {
    const response = await http.get("/book/bestseller?page=1&size=9");
    return response.data;
  } catch (err) {
    const error = err as AxiosError<getBookAsyncFail>;
    if (!error.response) throw err;
    return rejectWithValue(error.response.data);
  }
});

// 카테고리
export const getCategoryBook = createAsyncThunk<getBookAsyncSuccess>(
  `getCategoryBook/bookAsync`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await http.get(`/book/byCategory?categoryId=74&page=0&size=20`);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<getBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// Slice
export const getBookSlice = createSlice({
  name: "bookList",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 베스트셀러
      .addCase(getBookAPI.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getBookAPI.fulfilled, (state, { payload }) => {
        state.item = payload.data.item;
        state.status = "idle";
      })
      .addCase(getBookAPI.rejected, (state, { payload }) => {
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
      .addCase(getCategoryBook.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getCategoryBook.fulfilled, (state, { payload }) => {
        state.item = payload.data.item;
        state.status = "idle";
      })
      .addCase(getCategoryBook.rejected, (state, { payload }) => {
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

export const getBookSelector = (state: RootState) => state.bookListReduce;
export const getBookItemList = (state: RootState) => state.bookListReduce.item;

export default getBookSlice;
