import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { errorHandler } from "src/api/http";
import { getSearchAladinBooks, getSearchUsedBooks } from "src/api/search/seach";
import { RootState } from "src/modules/store";
import * as T from "./types";

const name = "searchReduce";

export const searchUsedBookListAsync = createAsyncThunk<T.UsedBookData, string, T.ThunkApi>(
  `${name}/searchUsedBookListAsync`,
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getSearchUsedBooks(query);
      return {
        ...data.data,
      };
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const searchAladinBookListAsync = createAsyncThunk<T.AladinData, string, T.ThunkApi>(
  `${name}/searchAladinListAsync`,
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await getSearchAladinBooks(query);
      return {
        ...data.data,
      };
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

const initialState: T.ISearchReduce = {
  usedBook: {
    status: "idle",
    pages: null,
    error: null,
    pageCount: 0,
  },
  bookReview: {
    status: "idle",
    error: null,
    pages: null,
    pageCount: 0,
  },
};

const searchSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(searchUsedBookListAsync.pending, state => {
      state.usedBook.status = "loading";
    });
    builder.addCase(searchUsedBookListAsync.fulfilled, (state, { payload }) => {
      const { pageCount, pages } = payload;
      state.usedBook.status = "idle";
      state.usedBook.pages = pages.length ? pages : null;
      state.usedBook.pageCount = pageCount;
    });
    builder.addCase(searchUsedBookListAsync.rejected, (state, { payload }) => {
      state.usedBook.status = "idle";
      state.usedBook.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(searchAladinBookListAsync.pending, state => {
      state.bookReview.status = "loading";
    });
    builder.addCase(searchAladinBookListAsync.fulfilled, (state, { payload }) => {
      const { item, totalResults } = payload;
      state.bookReview.status = "idle";
      state.bookReview.pages = item.length ? item : null;
      state.bookReview.pageCount = totalResults;
    });
    builder.addCase(searchAladinBookListAsync.rejected, (state, { payload }) => {
      state.bookReview.status = "idle";
      state.bookReview.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
  },
});

export const searchUsedBookSelector = ({ searchReduce }: RootState) => searchReduce.usedBook;
export const searchAladinBookSelector = ({ searchReduce }: RootState) => searchReduce.bookReview;
export default searchSlice;
