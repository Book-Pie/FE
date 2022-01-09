import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { removeEmail, removeToken, setRememberEmail, setAccessToken, getAccessToken } from "utils/localStorageUtil";
import { getMyProfile, getSignIn } from "src/api/signIn/signIn";
import { addHyphenFormat } from "src/utils/formatUtil";
import { RootState } from "modules/store";
import {
  IAxiosResponse,
  IPayload,
  MyProfileAsyncFail,
  MyProfileResponse,
  MyProfileSuccess,
  MyProfileThunkApi,
  SignInAsyncFail,
  SignInAsyncProps,
  SignInAsyncSuccess,
  SignInReduceProps,
  SignInThunkApi,
} from "./types";

const name = "signInReduce";

// 내 프로필 가져오기
export const myProfileAsync = createAsyncThunk<MyProfileSuccess, string, MyProfileThunkApi>(
  `${name}/myProfileAsync`,
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await getMyProfile<MyProfileResponse>(token);
      return data;
    } catch (err) {
      const error = err as AxiosError<MyProfileAsyncFail>;

      if (!error.response) throw err;

      const rejectParams = error.response.data;

      // 서버에서 에러를 핸들링 안 했을때
      if (!error.response.data) {
        const { status } = error.response;
        rejectParams.error = error.message;
        rejectParams.status = status;
        rejectParams.path = "";
      }
      return rejectWithValue(rejectParams);
    }
  },
);

// 썽크 생성 함수의 첫번째 제너릭은 반환 타입을 준다.
// 썽크 생성 함수의 두번째 제너릭은 파라미터의 타입을 준다.
// 썽크 생성 함수의 세번째 제너릭은 {dispatch?, state?, extra?, rejectValue?}에 타입을 설정해줄 수 있다.
// 로그인
export const signInAsync = createAsyncThunk<SignInAsyncSuccess, SignInAsyncProps, SignInThunkApi>(
  `${name}/signInAsync`,
  async ({ email, password, isRemember }, { dispatch, extra, rejectWithValue }) => {
    try {
      const response = await getSignIn<IAxiosResponse, IPayload>({ email, password });
      const { data } = response;
      setRememberEmail(email);
      if (!isRemember) removeEmail();
      dispatch(myProfileAsync(data.data));
      const { history } = extra;
      history.push("/");
      return { ...data };
    } catch (err) {
      const error = err as AxiosError<SignInAsyncFail>;
      // axios 에러가 아닌 런타임 에러를 캐치하기 위한 용도입니다.
      if (!error.response) throw err;

      const rejectParams = error.response.data;

      // 서버에서 에러를 핸들링 안 했을때
      if (!error.response.data) {
        const { status } = error.response;
        rejectParams.error = {
          status,
          message: error.message,
        };
        rejectParams.data = null;
        rejectParams.success = false;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

const initialState: SignInReduceProps = {
  user: null,
  token: null,
  isLoggedIn: false,
  error: null,
  status: "idle",
};

// docks패턴처럼 하나의 함수에 initialState action reduce를 정의 할 수 있다.
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
    setErrorReset: () => initialState,
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
      // 언디파인드가 아닐 때
      if (payload) state.error = payload.error;

      // 서버에서 응답이 없을 때
      if (!payload) {
        state.error = {
          status: 500,
          message: "서버에서 에러가 발생했습니다.",
        };
      }
      state.token = null;
      state.status = "idle";
    });
    builder.addCase(myProfileAsync.pending, state => {
      state.isLoggedIn = true;
    });
    builder.addCase(myProfileAsync.fulfilled, (state, { payload }) => {
      state.user = payload.data;
      if (payload.data.phone !== null) state.user.phone = addHyphenFormat(payload.data.phone);
      state.token = getAccessToken();
    });
    builder.addCase(myProfileAsync.rejected, (state, { payload }) => {
      if (payload) {
        if (payload.status === 403) {
          removeToken();
          state.error = {
            message: "유효하지않는 토큰입니다. 다시 로그인해주세요.",
            status: payload.status,
          };
        }
        if (payload.status === 500) {
          removeToken();
          state.error = {
            message: "서버에서 에러가 발생했습니다. 다시 로그인해주세요.",
            status: payload.status,
          };
        }
      }
      removeToken();
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.status = "idle";
    });
  },
});

export const signInSelector = (state: RootState) => state.signInReduce;

export const { logout, setErrorReset } = signInSlice.actions;
export default signInSlice;
