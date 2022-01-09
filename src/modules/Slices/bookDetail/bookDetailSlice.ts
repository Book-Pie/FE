import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import book from "../../../api/book";
import { RootState } from "../../store";
import { ThunkApi, bookAsyncFail, bookAsyncSuccess, bookSliceProps, name } from "./types";

const initialState = {
  bookId: 0,
  user: 0,
  content: [] as any,
  status: "loading",
  replyDate: "",
};

export const bookDetailAsync = createAsyncThunk<bookAsyncSuccess, bookSliceProps, ThunkApi>(
  `${name}/bookAsync`,
  async ({ bookId, user, content, replyDate }, { rejectWithValue }) => {
    try {
      const response = await book.get("/book");
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

export const bookDetailSlice = createSlice({
  name: "bookReduce",
  initialState,
  reducers: {
    addbook: (state, action: PayloadAction<any>) => {
      const newbook = {
        bookId: Date.now(),
        user: Date.now(),
        content: action.payload.content,
        replyDate: action.payload.replyDate,
      };
      state.content.push(newbook);
    },
  },
  extraReducers: builder => {
    builder.addCase(bookDetailAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.content = payload;
    });
    builder.addCase(bookDetailAsync.rejected, state => {
      state.status = "failed";
    });
  },
});

export const booksSelector = (state: RootState) => state.bookDetailReduce;
export const { addbook } = bookDetailSlice.actions;
export default bookDetailSlice;
