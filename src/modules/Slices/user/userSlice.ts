import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeEmail, removeToken, setRememberEmail, setAccessToken, getAccessToken } from "utils/localStorageUtil";
import { getSignIn, getUserNickNameUpdate, getUserInfo } from "api/user";
import { hyphenFormat } from "utils/formatUtil";
import { RootState } from "modules/store";

import http, { errorHandler } from "api/http";
import { getOrderInfo, getUserOrderByUsedBookId } from "api/order";
import * as Types from "./types";

const name = "userReduce";

// 내 프로필 가져오기
export const userInfoAsync = createAsyncThunk<Types.UserInfoAsyncSuccess, string, Types.ThunkApi>(
  `${name}/userInfoAsync`,
  async (token, { rejectWithValue, extra }) => {
    const { history } = extra;
    try {
      const { data } = await getUserInfo<Types.UserInfoAsyncResponse>(token);
      return data.data;
    } catch (error: any) {
      const { message } = error;
      history.replace("/signIn");
      removeToken();
      return rejectWithValue(message);
    }
  },
);

// 썽크 생성 함수의 첫번째 제너릭은 반환 타입을 준다.
// 썽크 생성 함수의 두번째 제너릭은 파라미터의 타입을 준다.
// 썽크 생성 함수의 세번째 제너릭은 {dispatch?, state?, extra?, rejectValue?}에 타입을 설정해줄 수 있다.
// 로그인
export const signInAsync = createAsyncThunk<string, Types.SignInAsyncParam, Types.ThunkApi>(
  `${name}/signInAsync`,
  async ({ email, password, isRemember }, { dispatch, extra, rejectWithValue }) => {
    try {
      const { data } = await getSignIn<Types.SignInAsyncResponse, Types.SignInAsyncRequest>({ email, password });
      const token = data.data;
      setRememberEmail(email);
      if (!isRemember) removeEmail();
      dispatch(userInfoAsync(token));
      const { history } = extra;
      history.push("/");
      return token;
    } catch (error: any) {
      const { message } = error;
      return rejectWithValue(message);
    }
  },
);

// 닉네임 수정
export const nickNameUpdateAsync = createAsyncThunk<string, Types.NickNameUpdateParam, Types.ThunkApi>(
  `${name}/nickNameUpdateAsync`,
  async ({ nickName, token }, { rejectWithValue, dispatch }) => {
    try {
      await getUserNickNameUpdate(nickName, token);
      dispatch(userInfoAsync(token));
      return "닉네임이 변경 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 판매상세보기
export const saleInfoAsync = createAsyncThunk<Types.SaleInfoAsyncSuccess, string, Types.ThunkApi>(
  `${name}/saleInfoAsync`,
  async (userdBookId, { getState, rejectWithValue }) => {
    const { userReduce } = getState();
    const { user, token } = userReduce;
    try {
      if (!user || !token) throw new Error("로그인이 필요합니다.");
      const { data } = await getUserOrderByUsedBookId(userdBookId, token);
      return data.data as Types.SaleInfoAsyncSuccess;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const buyInfoAsync = createAsyncThunk<Types.BuyInfoAsyncSuccess, string, Types.ThunkApi>(
  `${name}/buyInfoAsync`,
  async (orderId, { getState, rejectWithValue }) => {
    const { userReduce } = getState();
    const { user, token } = userReduce;
    try {
      if (!user || !token) throw new Error("로그인이 필요합니다.");
      const { data } = await getOrderInfo(orderId, token);
      return data.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const reviewListAsync = createAsyncThunk<Types.ReviewListAsyncSuccess, string, Types.ThunkApi>(
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

const initialState: Types.SignInReduce = {
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

const userSlice = createSlice({
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
    setClearError: state => {
      state.error = null;
    },
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
      setAccessToken(payload);
      state.token = payload;
      state.error = null;
      state.status = "idle";
    });
    builder.addCase(signInAsync.rejected, (state, { payload }) => {
      state.error = payload ?? "로그인에 실패했습니다.";
      state.token = null;
      state.status = "idle";
    });
    builder.addCase(userInfoAsync.pending, state => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(userInfoAsync.fulfilled, (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload;
      state.status = "idle";
      if (payload.phone !== null) state.user.phone = hyphenFormat(payload.phone);
      state.token = getAccessToken();
    });
    builder.addCase(userInfoAsync.rejected, (state, { payload }) => {
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

export const userReduceSelector = ({ userReduce }: RootState) => userReduce;
export const userSelector = ({ userReduce }: RootState) => userReduce.user;
export const isLoggedInSelector = ({ userReduce }: RootState) => userReduce.isLoggedIn;
export const userSaleInfoSelector =
  (bookId: number) =>
  ({ userReduce }: RootState) =>
    userReduce.saleInfos.find(info => info.book.bookId === bookId);
export const userBuyInfoSelector =
  (orderId: number) =>
  ({ userReduce }: RootState) =>
    userReduce.buyInfos.find(info => info.orderId === orderId);
export const userReviewsSelector = ({ userReduce }: RootState) => userReduce.reviews;
export const { logout, setClearError, setReviewPage } = userSlice.actions;
export default userSlice;
