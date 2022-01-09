import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { History } from "history";
import { RootState } from "modules/store";
import api from "../../../api/bookAPI";

// 메인페이지 최신등록상품

// initialState로 사용할 객체의 data type
interface RecentlyBookItemProps {
  id: number;
  title: string;
  category: string;
  price: string;
  image: string;
}

// 리듀가 사용할 데이터 타입
interface RecentlyBookListReduceProps {
  pages: RecentlyBookItemProps[];
  status: "loading" | "idle";
  error: null | {
    code: number;
    message: string;
  };
}

// 썽크함수 성공시 반환 타입
interface getRecentlyBookAsyncSuccess {
  success: boolean;
  data: {
    pages: RecentlyBookItemProps[];
  };
  error: null;
}

// 썽크함수 실패시 반환 타입
interface getRecentlyBookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 썽크함수가 사용하는 api 타입
interface ThunkApi {
  rejectValue: getRecentlyBookAsyncFail;
}

const name = "recentlyBook";

// 정렬조건 받기위한 인자
interface OrderProps {
  sort?: "date" | "view";
}

// Middleware
export const getRecentlyBookAPI = createAsyncThunk<getRecentlyBookAsyncSuccess, undefined, ThunkApi>(
  `${name}/recentlyBookAsync`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/recentlyUsedBook");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<getRecentlyBookAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// Slice
export const getRecentlyBookSlice = createSlice({
  name,
  initialState: {
    pages: [
      {
        id: 1,
        title: "청춘은 아름다워",
        category: "소설",
        price: "10000",
        image: "https://image.aladin.co.kr/product/28540/86/coversum/k162835233_2.jpg",
      },
    ],
    status: "idle",
    error: null,
  } as RecentlyBookListReduceProps,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getRecentlyBookAPI.pending, state => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(getRecentlyBookAPI.fulfilled, (state, { payload }) => {
      console.log("페이로드확인", payload.data);
      state.pages = payload.data.pages;
    });
    builder.addCase(getRecentlyBookAPI.rejected, (state, { payload }) => {
      if (!payload) {
        state.error = {
          code: 500,
          message: "서버에서 데이터 못가져옴",
        };
      }
    });
  },
});

export const getRecentlyBookSelector = (state: RootState) => state.recentlyBookListReduce;
export default getRecentlyBookSlice;
