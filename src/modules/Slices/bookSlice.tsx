import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "src/modules/store";
import book from "src/api/book";

export interface bookSliceProps {
  bookId: number;
  user: number;
  content: string;
  replyDate: string;
}

// 통신 실패 시 반환하는 타입
interface bookAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 통신 성공 시 반환하는 타입
interface bookAsyncSuccess {
  success: boolean;
  data: string;
  error: null;
}

// 썽크함수가 사용하는 api 타입
interface ThunkApi {
  extra: {
    history: History;
  };
  rejectValue: bookAsyncFail;
}

const name = "book";

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
  name: "commentReduce",
  initialState: {
    bookId: 0,
    user: 0,
    content: "",
    replyDate: "",
  },
  reducers: {
    addbook: (state, action: PayloadAction<any>) => {
      const newbook = {
        bookId: Date.now(),
        user: Date.now(),
        content: action.payload.content,
        replyDate: action.payload.replyDate,
      };
      state.push(newbook);
    },
  },
  extraReducers: builder => {
    builder.addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
      state.status = "loading";
    });
    builder.addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.users = action.payload;
    });
    builder.addCase(bookDetailAsync.fulfilled, (state, { payload }) => {
      state.status = "failed";
    });
  },
});

export const booksSelector = (state: RootState) => state.bookReduce;
export const { addbook, deletebook } = bookSlice.actions;
export default bookSlice;
