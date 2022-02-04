import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import client, { errorHandler } from "api/client";
import { RootState } from "modules/store";

import * as Types from "./types";

const name = "searchReduce";

export const searchUsedBooksAsync = createAsyncThunk<Types.SearchUsedBooksAsyncSuccess, string, Types.ThunkApi>(
  `${name}/searchUsedBooksAsync`,
  (query, { rejectWithValue }) => {
    return client
      .get<Types.SearchUsedBooksAsyncReponse>(`/usedbook${query}&limit=8`)
      .then(({ data }) => data)
      .catch(e => {
        const message = errorHandler(e);
        return rejectWithValue(message);
      });
  },
);

export const searchAladinBooksAsync = createAsyncThunk<
  Types.SearchAladinBooksAsyncSuccess,
  Types.AladinBookParam,
  Types.ThunkApi
>(`${name}/searchAladinBooksAsync`, async ({ query, isReload }, { rejectWithValue }) => {
  return client
    .get<Types.SearchAladinBooksAsyncReponse>(`/book/search?${query}&size=8`)
    .then(({ data }) => ({
      data,
      isReload,
    }))
    .catch(e => {
      const message = errorHandler(e);
      return rejectWithValue(message);
    });
});

const initialState: Types.SearchReduce = {
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
    builder.addCase(searchUsedBooksAsync.pending, state => {
      state.usedBook.status = "loading";
    });
    builder.addCase(searchUsedBooksAsync.fulfilled, (state, { payload }) => {
      const { pageCount, pages } = payload;
      state.usedBook.status = "idle";
      state.usedBook.pages = pages.length ? pages : null;
      state.usedBook.pageCount = pageCount;
    });
    builder.addCase(searchUsedBooksAsync.rejected, (state, { payload }) => {
      state.usedBook.status = "idle";
      state.usedBook.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(searchAladinBooksAsync.pending, state => {
      state.bookReview.status = "loading";
    });
    builder.addCase(searchAladinBooksAsync.fulfilled, (state, { payload }) => {
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
    builder.addCase(searchAladinBooksAsync.rejected, (state, { payload }) => {
      state.bookReview.status = "idle";
      state.bookReview.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
  },
});

export const searchUsedBookSelector = ({ searchReduce }: RootState) => searchReduce.usedBook;
export const searchAladinBookSelector = ({ searchReduce }: RootState) => searchReduce.bookReview;
export const { reset } = searchSlice.actions;
export default searchSlice;
