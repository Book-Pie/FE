import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "modules/store";
import api from "../../api/bookAPI";

// initialState로 사용할 객체의 data type
interface BookItemProps {
  itemId: number;
  title: string;
  categoryName: string;
  cover: string;
  bestRank: number;
}

// 리듀가 사용할 데이터 타입
interface BookListReduceProps {
  bookList: BookItemProps[];
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
    bookList: BookItemProps[];
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
      const response = await api.get("/bestSeller");
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
    bookList: [
      {
        itemId: 12345,
        title: "책이름",
        categoryName: "소설",
        cover: "https://image.aladin.co.kr/product/28540/88/coversum/k222835233_1.jpg",
        bestRank: 1,
      },
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
      state.bookList = payload.data.bookList;
    });
    builder.addCase(getbookAPI.rejected, (state, { payload }) => {
      // 에러핸들링
      if (!payload) {
        state.error = {
          code: 500,
          message: "서버에서 데이터 못가져옴",
        };
      }
    });
    // builder.addCase(getbookAPItest.pending, state => );
  },
});

export const getBookSelector = (state: RootState) => state.bookListReduce;
export default getBookSlice;
