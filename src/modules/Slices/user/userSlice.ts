import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { removeToken, setAccessToken, getAccessToken } from "utils/localStorageUtil";
import { hyphenFormat } from "utils/formatUtil";
import { RootState } from "modules/store";
import client, { makeAuthTokenHeader } from "api/client";
import http, { errorHandler } from "api/http";
import { OrderResult } from "src/components/OrderForm/types";
import * as Types from "./types";

const NAME = "userReduce";

/**
 *   유저 정보 가져오기
 *   @param  X-AUTH-TOKEN
 *   @return 유저 정보
 */
export const userInfoAsync = createAsyncThunk<Types.UserInfoAsyncSuccess, string, Types.ThunkApi>(
  `${NAME}/userInfoAsync`,
  async (token, { rejectWithValue, extra }) => {
    const { history } = extra;
    try {
      const { data } = await client.get<Types.UserInfoAsyncResponse>("/user/me", makeAuthTokenHeader(token));
      return data;
    } catch (e) {
      history.replace("/signIn");
      removeToken();
      return rejectWithValue(errorHandler(e));
    }
  },
);

/**
 *   1. 썽크 생성 함수의 첫번째 제너릭은 반환 타입을 준다.
 *   2. 썽크 생성 함수의 두번째 제너릭은 파라미터의 타입을 준다.
 *   3. 썽크 생성 함수의 세번째 제너릭은 {dispatch?, state?, extra?, rejectValue?}에 타입을 설정해줄 수 있다.
 *   유저 로그인
 *   @param  이메일, 비밀번호
 *   @return 로그인 토큰
 */
export const signInAsync = createAsyncThunk<string, Types.SignInAsyncRequestBodoy, Types.ThunkApi>(
  `${NAME}/signInAsync`,
  async ({ email, password }, { dispatch, extra, rejectWithValue }) => {
    const { history } = extra;
    try {
      const payload = { email, password };
      const { data: token } = await client.post<Types.SignInAsyncRequestBodoy, Types.SignInAsyncResponse>(
        "/user/login",
        payload,
      );
      dispatch(userInfoAsync(token));
      history.push("/");
      return token;
    } catch (e) {
      return rejectWithValue(errorHandler(e));
    }
  },
);

/**
 *   유저 닉네임 수정
 *   @param  변경 할 닉네임, 토큰
 *   @return 변경완료 메세지
 */
export const nickNameUpdateAsync = createAsyncThunk<string, { nickName: string; token: string }, Types.ThunkApi>(
  `${NAME}/nickNameUpdateAsync`,
  async ({ nickName, token }, { rejectWithValue, dispatch }) => {
    try {
      await client.put(`/user/nickname/${nickName}`, {}, makeAuthTokenHeader(token));
      dispatch(userInfoAsync(token));
      return "닉네임이 변경 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

/**
 *   유저가 판매한 중고도서 판매내역보기
 *   @param  중고도서번호
 *   @return 판매내역
 */
export const saleInfoAsync = createAsyncThunk<OrderResult, string, Types.ThunkApi>(
  `${NAME}/saleInfoAsync`,
  async (usedBookId, { getState, rejectWithValue }) => {
    const { isLoggedIn, token } = getState().userReduce;
    try {
      if (!isLoggedIn || !token) throw new Error("로그인이 필요합니다.");
      const { data } = await client.get<Types.SaleInfoAsyncResponse>(
        `/order/book/${usedBookId}`,
        makeAuthTokenHeader(token),
      );
      return data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

/**
 *   유저가 구매한 중고도서 구매내역보기
 *   @param  주문번호
 *   @return 구매내역
 */
export const buyInfoAsync = createAsyncThunk<OrderResult, string, Types.ThunkApi>(
  `${NAME}/buyInfoAsync`,
  async (orderId, { getState, rejectWithValue }) => {
    const { isLoggedIn, token } = getState().userReduce;
    try {
      if (!isLoggedIn || !token) throw new Error("로그인이 필요합니다.");
      const { data } = await client.get<Types.BuyInfoAsyncResponse>(`/order/${orderId}`, makeAuthTokenHeader(token));
      return data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const reviewListAsync = createAsyncThunk<Types.ReviewListAsyncSuccess, string, Types.ThunkApi>(
  `${NAME}/reviewListAsync`,
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
  name: NAME,
  initialState,
  reducers: {
    // 액션함수 이름 logout
    // 함수 내용 리듀서
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
      state.token = null;
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
