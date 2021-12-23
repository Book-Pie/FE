import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { History } from "history";
import { RootState } from "modules/store";
import { removeSaveId, removeToken, setSaveId, setToken } from "utils/localStorageUtil";

// thunk 함수로 넘겨질 인자 타입
interface SignInAsyncProps {
  id: string;
  password: string;
  isRemember: boolean;
}

// 리듀가 사용할 데이터 타입
interface SignInReduceProps {
  user: {
    id: string;
    token: string | null;
    isLoggedIn: boolean;
  };
  status: "loading" | "idle";
  error: null | {
    code: number;
    message: string;
  };
}

// 통신 실패 시 반환하는 타입
interface SignInAsyncFail {
  success: boolean;
  data: null;
  error: {
    code: number;
    message: string;
  };
}

// 통신 성공 시 반환하는 타입
interface SignInAsyncSuccess {
  success: boolean;
  data: string;
  error: null;
}

// 썽크함수가 사용하는 api 타입
interface ThunkApi {
  extra: {
    history: History;
  };
  rejectValue: SignInAsyncFail;
}

const name = "signInReduce";

// 썽크 생성 함수의 첫번째 제너릭은 반환 타입을 준다.
// 썽크 생성 함수의 두번째 제너릭은 파라미터의 타입을 준다.
// 썽크 생성 함수의 세번째 제너릭은 {dispatch?, state?, extra?, rejectValue?}에 타입을 설정해줄 수 있다.
export const signInAsync = createAsyncThunk<SignInAsyncSuccess, SignInAsyncProps, ThunkApi>(
  `${name}/signInAsync`,
  async ({ id, password, isRemember }, { extra, rejectWithValue }) => {
    try {
      const { history } = extra;
      // const response = await axios.get("http://localhost:3001/signin-success");
      // 에러 테스트 할때 사용합니다.
      const response = await axios.get("http://localhost:3001/signin-error");
      const { data } = response;
      const { success } = data as SignInAsyncSuccess;

      if (!success) {
        if (data.error.code === 404) {
          return rejectWithValue(data);
        }
      }

      // 아이디 저장
      setSaveId(id);
      if (!isRemember) removeSaveId();

      // 로그인 성공 시 홈으로 이동한다.
      history.push("/");
      return data;
    } catch (err) {
      const error = err as AxiosError<SignInAsyncFail>;
      // axios 에러가 아닌 런타임 에러를 캐치하기 위한 용도입니다.
      if (!error.response) throw err;

      return rejectWithValue(error.response.data);
    }
  },
);

// docks패턴처럼 하나의 함수에 initialState action reduce를 정의 할 수 있다.
const signInSlice = createSlice({
  name,
  initialState: {
    user: {
      id: "",
      isLoggedIn: false,
      token: null,
    },
    error: null,
    status: "idle",
  } as SignInReduceProps,
  reducers: {
    logout: state => {
      state.user = {
        id: "",
        isLoggedIn: false,
        token: null,
      };
      state.error = null;
      removeToken();
      alert("로그아웃 되었습니다.");
    },
  },
  extraReducers: builder => {
    builder.addCase(signInAsync.pending, state => {
      state.error = null;
      state.status = "loading";
    });
    builder.addCase(signInAsync.fulfilled, (state, { payload }) => {
      state.user.isLoggedIn = true;
      state.user.token = payload.data;
      state.error = null;
      state.status = "idle";
      setToken(payload.data);
    });
    builder.addCase(signInAsync.rejected, (state, { payload }) => {
      if (payload) {
        state.error = payload.error;
      }

      if (!payload) {
        // 서버에서 응답이 없을 때
        state.error = {
          code: 500,
          message: "서버에서 에러가 발생했습니다.",
        };
      }
      state.user.token = null;
      state.status = "idle";
    });
  },
});

export const signInSelector = (state: RootState) => state.signInReduce;
export const { logout } = signInSlice.actions;
export default signInSlice;
