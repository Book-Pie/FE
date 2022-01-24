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

export const searchAladinBookListAsync = createAsyncThunk<T.AladinBookSucess, T.AladinBookParam, T.ThunkApi>(
  `${name}/searchAladinListAsync`,
  async ({ query, isReload }, { rejectWithValue }) => {
    try {
      const { data } = await getSearchAladinBooks(query);
      return {
        data: data.data,
        isReload,
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
    pageCount: 1,
    page: 1,
  },
};

const searchSlice = createSlice({
  name,
  initialState,
  reducers: {
    reset: state => {
      state.bookReview.pages = null;
      state.bookReview.page = 1;
      state.bookReview.pageCount = 1;
    },
  },
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
      if (payload.data !== null) {
        const { item, totalResults, startIndex } = payload.data;
        if (payload.isReload === false) {
          if (state.bookReview.pages) {
            if (item && item.length) {
              state.bookReview.pages = [...state.bookReview.pages, ...item];
              state.bookReview.pageCount = totalResults;
              state.bookReview.page = startIndex;
            }

            if (item.length === 0) {
              state.bookReview.pageCount = totalResults;
              state.bookReview.page = totalResults;
            }
            // 첫 통신
          } else if (state.bookReview.pages === null) {
            state.bookReview.pages = item.length ? item : null;
            state.bookReview.pageCount = 1;
            state.bookReview.page = 1;
          }
        } else if (payload.isReload) {
          if (item.length) {
            state.bookReview.pages = item;
            state.bookReview.pageCount = totalResults;
            state.bookReview.page = startIndex;
          } else {
            state.bookReview.pages = null;
            state.bookReview.pageCount = totalResults;
            state.bookReview.page = totalResults;
          }
        }
      } else {
        state.bookReview.pages = null;
        state.bookReview.pageCount = 1;
        state.bookReview.page = 1;
      }

      state.bookReview.status = "idle";
    });
    builder.addCase(searchAladinBookListAsync.rejected, (state, { payload }) => {
      state.bookReview.status = "idle";
      state.bookReview.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
  },
});

export const searchUsedBookSelector = ({ searchReduce }: RootState) => searchReduce.usedBook;
export const searchAladinBookSelector = ({ searchReduce }: RootState) => searchReduce.bookReview;
export const { reset } = searchSlice.actions;
export default searchSlice;
