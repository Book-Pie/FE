import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeEmail, removeToken, setRememberEmail, setAccessToken, getAccessToken } from "utils/localStorageUtil";
import { getSignIn } from "src/api/oauth";
import { addHyphenFormat } from "src/utils/formatUtil";
import { RootState } from "modules/store";
import { getNickNameUpdate, getMyProfile } from "src/api/my/my";
import http, { errorHandler } from "src/api/http";
import { getMyOrder, getMyOrderByBookId } from "src/api/usedBook/usedBook";
import { IOrderResult } from "src/components/OrderForm/types";
import {
  IAxiosResponse,
  IPayload,
  MyProfileResponse,
  MyProfileSuccess,
  MyProfileThunkApi,
  NickNameUpdateParam,
  NickNameUpdateThunkApi,
  SignInAsyncParam,
  SignInAsyncSuccess,
  ISignInReduce,
  SignInThunkApi,
  NickNameResponse,
  BuyThunkApi,
  ThunkApi,
  ReviewListData,
} from "./types";

const name = "signInReduce";

// 내 프로필 가져오기
export const myInfoAsync = createAsyncThunk<MyProfileSuccess, string, MyProfileThunkApi>(
  `${name}/myInfoAsync`,
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await getMyProfile<MyProfileResponse>(token);
      return data;
    } catch (error: any) {
      const { message } = error;
      return rejectWithValue(message);
    }
  },
);

// 썽크 생성 함수의 첫번째 제너릭은 반환 타입을 준다.
// 썽크 생성 함수의 두번째 제너릭은 파라미터의 타입을 준다.
// 썽크 생성 함수의 세번째 제너릭은 {dispatch?, state?, extra?, rejectValue?}에 타입을 설정해줄 수 있다.
// 로그인
export const signInAsync = createAsyncThunk<SignInAsyncSuccess, SignInAsyncParam, SignInThunkApi>(
  `${name}/signInAsync`,
  async ({ email, password, isRemember }, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await getSignIn<IAxiosResponse, IPayload>({ email, password });
      const { data } = response;
      const token = data.data;
      setRememberEmail(email);
      if (!isRemember) removeEmail();
      dispatch(myInfoAsync(token));
      const { history } = extra;
      history.push("/");
      return { ...data };
    } catch (error: any) {
      const { message } = error;
      return rejectWithValue(message);
    }
  },
);

export const nickNameUpdateAsync = createAsyncThunk<NickNameResponse, NickNameUpdateParam, NickNameUpdateThunkApi>(
  `${name}/nickNameUpdateAsync`,
  async ({ nickName, token }, { rejectWithValue, dispatch }) => {
    try {
      await getNickNameUpdate(nickName, token);
      dispatch(myInfoAsync(token));
      return { message: "닉네임이 변경 되었습니다." };
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue({ message });
    }
  },
);

export const buyInfoAsync = createAsyncThunk<IOrderResult, string, BuyThunkApi>(
  `${name}/buyInfoAsync`,
  async (orderId, { getState, rejectWithValue }) => {
    const { signInReduce } = getState();
    const { user, token } = signInReduce;
    try {
      if (!user || !token) throw new Error("로그인이 필요합니다.");
      const { data } = await getMyOrder(orderId, token);
      return data.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const saleInfoAsync = createAsyncThunk<IOrderResult, string, BuyThunkApi>(
  `${name}/saleInfoAsync`,
  async (bookId, { getState, rejectWithValue }) => {
    const { signInReduce } = getState();
    const { user, token } = signInReduce;
    try {
      if (!user || !token) throw new Error("로그인이 필요합니다.");
      const { data } = await getMyOrderByBookId(bookId, token);
      return data.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const reviewListAsync = createAsyncThunk<ReviewListData, string, ThunkApi>(
  `${name}/reviewListAsync`,
  async (query, { rejectWithValue }) => {
    try {
      const { data } = await http.get(`/book-review/my?${query}`);
      return data.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

const initialState: ISignInReduce = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
  status: "idle",
  buyInfos: [],
  saleInfos: [],
  reviews: {
    contents: null,
    empty: false,
    page: 0,
    pageCount: 0,
    size: 10,
    status: "idle",
    error: null,
  },
};

const signInSlice = createSlice({
  name,
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
      removeToken();
      alert("로그아웃 되었습니다.");
    },
    errorReset: () => initialState,
    setReviewPage: (state, action) => {
      state.reviews.page = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signInAsync.pending, state => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(signInAsync.fulfilled, (state, { payload }) => {
      state.token = payload.data;
      state.error = null;
      state.status = "idle";
      setAccessToken(payload.data);
    });
    builder.addCase(signInAsync.rejected, (state, { payload }) => {
      state.error = payload ?? "로그인에 실패했습니다.";
      state.token = null;
      state.status = "idle";
    });
    builder.addCase(myInfoAsync.pending, state => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(myInfoAsync.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload.data;
      state.status = "idle";
      if (payload.data.phone !== null) state.user.phone = addHyphenFormat(payload.data.phone);
      state.token = getAccessToken();
    });
    builder.addCase(myInfoAsync.rejected, (state, { payload }) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.status = "idle";
      state.error = payload ?? "프로필 가져오기를 실패했습니다.";
    });
    builder.addCase(buyInfoAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(buyInfoAsync.fulfilled, (state, { payload }) => {
      state.status = "idle";
      if (state.buyInfos.find(({ orderId }) => orderId === payload.orderId) === undefined) {
        state.buyInfos = [...state.buyInfos, payload];
      }
    });
    builder.addCase(buyInfoAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(saleInfoAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(saleInfoAsync.fulfilled, (state, { payload }) => {
      if (state.saleInfos.find(({ book }) => book.bookId === payload.book.bookId) === undefined) {
        state.saleInfos = [...state.saleInfos, payload];
      }
      state.status = "idle";
    });
    builder.addCase(saleInfoAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(reviewListAsync.pending, state => {
      state.reviews.status = "loading";
      state.reviews.error = null;
    });
    builder.addCase(reviewListAsync.fulfilled, (state, { payload }) => {
      const {
        content,
        empty,
        size,
        totalPages,
        pageable: { pageNumber },
      } = payload;

      if (state.reviews.contents) {
        state.reviews.contents[pageNumber] = content;
        state.reviews.page = pageNumber;
        state.reviews.pageCount = totalPages;
      } else {
        state.reviews.contents = [content];
        state.reviews.empty = empty;
        state.reviews.size = size;
        state.reviews.page = pageNumber;
        state.reviews.pageCount = totalPages;
      }

      state.reviews.status = "idle";
    });
    builder.addCase(reviewListAsync.rejected, (state, action) => {
      state.status = "idle";
      state.error = action.payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
  },
});

export const signInSelector = ({ signInReduce }: RootState) => signInReduce;
export const signInUser = (state: RootState) => state.signInReduce.user;
export const isLoggedInSelector = (state: RootState) => state.signInReduce.isLoggedIn;
export const saleInfoSelector =
  (bookId: number) =>
  ({ signInReduce }: RootState) =>
    signInReduce.saleInfos.find(info => info.book.bookId === bookId);
export const buyInfoSelector =
  (orderId: number) =>
  ({ signInReduce }: RootState) =>
    signInReduce.buyInfos.find(info => info.orderId === orderId);
export const reviewsSelector = ({ signInReduce }: RootState) => signInReduce.reviews;
export const { logout, errorReset, setReviewPage } = signInSlice.actions;
export default signInSlice;
