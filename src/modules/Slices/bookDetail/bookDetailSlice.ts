import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import http from "src/api/http";
import { RootState } from "src/modules/store";
import { bookAsyncFail, bookAsyncSuccess } from "./types";

const initialState = {
  content: {} as bookAsyncSuccess,
  status: "loading",
};

const name = "book";

export const bookDetailAsync = createAsyncThunk<bookAsyncSuccess, number>(
  `${name}/bookAsync`,
  async (item, { rejectWithValue }) => {
    try {
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

export const booksSelector = (state: RootState) => state.bookDetailReduce;
export default bookDetailSlice;
