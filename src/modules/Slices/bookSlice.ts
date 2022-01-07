import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "modules/store";
import api from "../../api/bookAPI";

// initialState로 사용할 객체의 data type
interface BookItemProps {
  author: string;
  isbn: string;
  link: string;
  description: string;
  title: string;
  pubDate: string;
  categoryName: string;
  fixedPrice: boolean;
  mallType: string;
  customerReviewRank: number;
  cover: string;
  itemId: number;
  subInfo: any;
  isbn13: string;
  stockStatus: string;
  publisher: string;
  priceSales: number;
  salesPoint: number;
  adult: boolean;
  categoryId: number;
  priceStandard: number;
  mileage: number;
  bestRank: number;
  // itemId: number;
  // title: string;
  // categoryName: string;
  // cover: string;
  // bestRank: number;
}

// 리듀가 사용할 데이터 타입
interface BookListReduceProps {
  item: BookItemProps[];
  status: "loading" | "idle";
  error: null | {
    code: number;
    message: string;
  };
}

// 썽크함수 성공시 반환 타입
interface getBookAsyncSucess {
  success: boolean;
  data: {
    totalResults: number;
    startIndex: number;
    item: BookItemProps[];
  };
  error: null;
}

// 썽크함수가 실패시 반환 타입
interface getBookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 썽크함수가 사용하는 api 타입
interface ThunkApi {
  rejectValue: getBookAsyncFail;
}

const name = "bookReduce";

// Middleware
export const getbookAPI = createAsyncThunk<getBookAsyncSucess, undefined, ThunkApi>(
  `${name}/bookAsync`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/book/bestSeller");
      return response.data;
    } catch (err) {
      const error = err as AxiosError<getBookAsyncFail>;
      if (!error.response) throw err; // 런타임 에러
      return rejectWithValue(error.response.data);
    }
  },
);

// export const getbookAPItest = createAsyncThunk<getBookAsyncSucess, BookItemProps, ThunkApi>(
//   `${name}/bookAsync`,
//   async ({ itemId, title, categoryName, cover, bestRank }, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/bestSeller");
//       const { data } = response;
//       return response.data;
//     } catch (err) {
//       const error = err as AxiosError<getBookAsyncFail>;
//       if (!error.response) throw err; // 런타임 에러
//       return rejectWithValue(error.response.data);
//     }
//   },
// );

// Slice
export const getBookSlice = createSlice({
  name: "bookList",
  initialState: {
    item: [
      // {
      //   itemId: 12345,
      //   title: "책이름",
      //   categoryName: "소설",
      //   cover: "https://image.aladin.co.kr/product/28540/88/coversum/k222835233_1.jpg",
      //   bestRank: 1,
      // },
    ],
    status: "idle",
    error: null,
  } as BookListReduceProps,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getbookAPI.pending, state => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(getbookAPI.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.item = payload.data.item;
    });
    builder.addCase(getbookAPI.rejected, (state, { payload }) => {
      console.log("error");
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
export default getBookSlice;
