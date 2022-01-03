import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { History } from "history";
import { AppDispatch, RootState } from "modules/store";
import { removeEmail, removeToken, setRememberEmail, setAccessToken } from "utils/localStorageUtil";
import { getMyProfile, getSignIn } from "src/api/signIn/signIn";

// =========================== 썽크함수 파라미터 타입 ===========================
// thunk 함수로 넘겨질 인자 타입
interface SignInAsyncProps {
  email: string;
  password: string;
  isRemember: boolean;
}
// =========================== 썽크함수 파라미터 타입 ===========================

// =========================== 썽크함수 성공 시 리턴 타입 ===========================
interface IUserPrfile {
  id: number;
  email: string;
  nickName: string;
  name: string;
  phone: string;
  grade: string;
  rating: number;
  address: {
    postalCode: string;
    mainAddress: string;
    detailAddress: string | null;
  };
  point: {
    totalPoint: 0;
    usedPoint: 0;
    holdPoint: 0;
  };
  image: null | string;
  createDate: string;
}
interface MyProfileSuccess {
  success: boolean;
  data: IUserPrfile;
  error: null;
}

interface SignInAsyncSuccess {
  success: boolean;
  data: string;
  error: null;
}
// =========================== 썽크함수 성공 시 리턴 타입 ===========================

// =========================== 썽크함수 실패 시 리턴 타입 ===========================
interface ErrorHandlring {
  status: number;
  message: string;
}

interface SignInAsyncFail {
  success: boolean;
  data: null;
  error: ErrorHandlring;
}

interface MyProfileAsyncFail {
  status: number;
  error: string;
  path: string;
}
// =========================== 썽크함수 실패 시 리턴 타입 ===========================

// =========================== axios 제네릭 ===========================
interface IPayload {
  email: string;
  password: string;
}
interface IAxiosResponse {
  success: boolean;
  data: string;
  error: null;
}
interface MyProfileResponse {
  data: IUserPrfile;
  error: null;
  success: boolean;
}
// =========================== axios 제네릭 ===========================

// =========================== ThunkApi 제네릭 ===========================
interface ThunkApi {
  dispatch: AppDispatch;
  state: RootState;
  extra: { history: History };
  rejectValue: SignInAsyncFail;
}
interface MyProfileThunkApi {
  dispatch: AppDispatch;
  state: RootState;
  rejectValue: MyProfileAsyncFail;
}
// =========================== ThunkApi 제네릭 ===========================

const name = "signInReduce";

export const getMyProfileAsync = createAsyncThunk<MyProfileSuccess, string, MyProfileThunkApi>(
  `${name}/getMyProfileAsync`,
  async (token, { rejectWithValue }) => {
    try {
      const { data } = await getMyProfile<MyProfileResponse>(token);
      return data;
    } catch (err) {
      const error = err as AxiosError<MyProfileAsyncFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.response.data);
    }
  },
);

// 썽크 생성 함수의 첫번째 제너릭은 반환 타입을 준다.
// 썽크 생성 함수의 두번째 제너릭은 파라미터의 타입을 준다.
// 썽크 생성 함수의 세번째 제너릭은 {dispatch?, state?, extra?, rejectValue?}에 타입을 설정해줄 수 있다.
export const signInAsync = createAsyncThunk<SignInAsyncSuccess, SignInAsyncProps, ThunkApi>(
  `${name}/signInAsync`,
  async ({ email, password, isRemember }, { dispatch, extra, rejectWithValue }) => {
    try {
      const { history } = extra;
      const response = await getSignIn<IAxiosResponse, IPayload>({ email, password });
      const { data } = response;
      setRememberEmail(email);
      if (!isRemember) removeEmail();
      dispatch(getMyProfileAsync(data.data));
      history.push("/");
      return { ...data };
    } catch (err) {
      const error = err as AxiosError<SignInAsyncFail>;
      // axios 에러가 아닌 런타임 에러를 캐치하기 위한 용도입니다.
      if (!error.response) throw err;

      return rejectWithValue(error.response.data);
    }
  },
);

// 리듀가 사용할 데이터 타입
export interface SignInReduceProps {
  user: IUserPrfile | null;
  token: string | null;
  isLoggedIn: boolean;
  status: "loading" | "idle";
  error: null | ErrorHandlring;
}

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
    builder.addCase(getMyProfileAsync.pending, state => {
      state.isLoggedIn = true;
    });
    builder.addCase(getMyProfileAsync.fulfilled, (state, { payload }) => {
      state.user = payload.data;
    });
    builder.addCase(getMyProfileAsync.rejected, (state, { payload }) => {
      if (payload) {
        if (payload.status === 403) {
          removeToken();
          state.error = {
            message: "유효하지않는 토큰입니다.",
            status: payload.status,
          };
        }
        return;
      }
      state.error = {
        status: 500,
        message: "서버에서 에러가 발생했습니다.",
      };
      state.status = "idle";
    });
  },
});

export const signInSelector = (state: RootState) => state.signInReduce;
export const { logout, setErrorReset } = signInSlice.actions;
export default signInSlice;
