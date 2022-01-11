import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import http from "src/api/http";
import { RootState } from "src/modules/store";
import { bookAsyncFail, bookAsyncSuccess } from "./types";

const initialState = {
  user: 0,
  content: {} as bookAsyncSuccess,
  status: "loading",
  replyDate: "",
};

export const bookDetailAsync = createAsyncThunk<bookAsyncSuccess, number>(
  `book/bookAsync`,
  async (item, { rejectWithValue }) => {
    try {
      console.log("bookDetailAsync 데이터 확인 : ", item);

      const response = await http.get(`book/${item}`, item);
      const { data } = response;
      const { success } = data;

      if (!success) {
        if (data.error.code === 200) {
          return console.log(data);
        }
      }
      return data;
    } catch (err) {
      const error = err as AxiosError<bookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

const bookDetailSlice = createSlice({
  name: "bookDetailReduce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(bookDetailAsync.pending, (state, action) => {
        console.log("bookDetailAsync pending : ", action);
        state.status = "loading";
      })

      .addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
        console.log("bookDetailAsync fulfilled : ", payload);
        state.status = "success";
        state.content = payload;
      })
      .addCase(bookDetailAsync.rejected, (state, action) => {
        console.log("bookDetailAsync rejected : ", action);
        state.status = "failed";
      });
  },
});

export const booksSelector = (state: RootState) => state.bookDetailReduce;
export default bookDetailSlice;
