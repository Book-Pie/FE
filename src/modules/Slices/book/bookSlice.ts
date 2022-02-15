import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "modules/store";
import client, { http, errorHandler } from "api/client";
import { ParamProps } from "src/components/BookDetail/types";

import {
  BookReduce,
  GetBookAsyncFail,
  GetBookAsyncSuccess,
  BookAsyncFail,
  BookAsyncSuccess,
  GetBookRecommendListParam,
  GetBookRecommendListAsyncSuccess,
  BestSellerAsync,
  ThunkApi,
  GetRecommendUsedBookListAsyncSuccess,
} from "./types";

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
  novelList: [],
  magazineList: [],
  economicList: [],
  status: "loading",
  error: null,
  item: [],
  bookRecommendList: [],
  usedBookRecommendList: [],
  list: {
    pages: [],
    pageCount: 1,
    isEmpty: false,
  },
};

// 베스트셀러
export const bestSellerAsync = createAsyncThunk<BestSellerAsync, void, ThunkApi>(
  `${name}/bestSeller`,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.get("/book/bestseller?page=1&size=9");
      return data;
    } catch (e) {
      const message = errorHandler(e);
      return rejectWithValue(message);
    }
  },
);

// 리뷰홈 소설 리스트
export const mainNovelList = createAsyncThunk<GetBookAsyncSuccess>(
  `${name}/mainNovelList`,
  async (_, { rejectWithValue }) => {
    try {
      const novel = 1;
      const { data } = await http.get(`/book/byCategory?categoryId=${novel}&page=1`);
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 리뷰홈 잡지 리스트
export const mainMagazineList = createAsyncThunk<GetBookAsyncSuccess>(
  `${name}/mainMagazineList`,
  async (_, { rejectWithValue }) => {
    try {
      const magazine = 2913;
      const { data } = await http.get(`/book/byCategory?categoryId=${magazine}&page=1`);
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 리뷰홈 잡지 리스트
export const mainEconomicList = createAsyncThunk<GetBookAsyncSuccess>(
  `${name}/mainEconomicList`,
  async (_, { rejectWithValue }) => {
    try {
      const economic = 656;
      const { data } = await http.get(`/book/byCategory?categoryId=${economic}&page=1`);
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

// 리뷰 상세페이지
export const bookDetailAsync = createAsyncThunk<BookAsyncSuccess, ParamProps>(
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

// 도서관 정보나루 추천목록
export const getBookRecommendList = createAsyncThunk<GetBookRecommendListAsyncSuccess, GetBookRecommendListParam>(
  `${name}/getBookRecommendList`,
  async ({ isbn }, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/book/recommend?isbn=${isbn}`);
      return data;
    } catch (err) {
      const error = err as AxiosError<GetBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 연관 중고도서
export const getRecommendUsedBookList = createAsyncThunk<
  GetRecommendUsedBookListAsyncSuccess,
  GetBookRecommendListParam
>(`${name}/getRecommendUsedBookList`, async ({ isbn }, { rejectWithValue }) => {
  try {
    const { data } = await http.get(`/usedbook/isbn/${isbn}`);
    return data;
  } catch (err) {
    const error = err as AxiosError<GetBookAsyncFail>;
    if (!error.response) throw err;
    return rejectWithValue(error.response.data);
  }
});

export const bookSlice = createSlice({
  name,
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
        state.bestSeller = payload.item;
        state.status = "idle";
      })
      .addCase(bestSellerAsync.rejected, (state, { payload }) => {
        state.status = "loading";
        state.error = {
          code: 500,
          message: payload ?? "서버에서 데이터 못가져옴",
        };
      })
      .addCase(mainNovelList.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(mainNovelList.fulfilled, (state, { payload }) => {
        state.novelList = payload.data.item;
        state.status = "idle";
      })
      .addCase(mainNovelList.rejected, (state, { payload }) => {
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      })
      .addCase(mainEconomicList.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(mainEconomicList.fulfilled, (state, { payload }) => {
        state.economicList = payload.data.item;
        state.status = "idle";
      })
      .addCase(mainEconomicList.rejected, (state, { payload }) => {
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      })

      .addCase(mainMagazineList.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(mainMagazineList.fulfilled, (state, { payload }) => {
        state.magazineList = payload.data.item;
        state.status = "idle";
      })
      .addCase(mainMagazineList.rejected, (state, { payload }) => {
        state.status = "loading";
        // 에러핸들링
        if (!payload) {
          state.error = {
            code: 500,
            message: "서버에서 데이터 못가져옴",
          };
        }
      })
      // 기본 리뷰 리스트
      .addCase(getDefaultBookList.pending, state => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getDefaultBookList.fulfilled, (state, { payload }) => {
        const { item } = payload.data;
        if (state.list.pages.length === 0) {
          state.list.pages = item;
        } else {
          state.list.pages = [...state.list.pages, ...item];
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
        if (state.list.pages.length === 0) {
          state.list.pages = item;
        } else {
          state.list.pages = [...state.list.pages, ...item];
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
      // 리뷰 상세페이지
      .addCase(bookDetailAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = payload;
      })
      .addCase(bookDetailAsync.rejected, state => {
        state.status = "failed";
      })
      // 도서관 정보나루 추천목록
      .addCase(getBookRecommendList.pending, state => {
        state.status = "loading";
      })
      .addCase(getBookRecommendList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.bookRecommendList = payload.data;
      })
      .addCase(getBookRecommendList.rejected, state => {
        state.status = "failed";
      })
      // 연관 중고도서
      .addCase(getRecommendUsedBookList.pending, state => {
        state.status = "loading";
      })
      .addCase(getRecommendUsedBookList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.usedBookRecommendList = payload.data;
      })
      .addCase(getRecommendUsedBookList.rejected, state => {
        state.status = "failed";
      });
  },
});
export const bestSellerSelector = ({ bookReduce }: RootState) => bookReduce.bestSeller;
export const bookReduceSelector = ({ bookReduce }: RootState) => bookReduce;
export const { setListInit } = bookSlice.actions;
export default bookSlice;
