import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import rootReducer from "./reducers";

// thunk 함수안에서 history api를 쓰기위해 호출
export const customHistory = createBrowserHistory();

const devTools = process.env.MODE !== "production" ? true : false;

// 리덕스 스토어 정의
const store = configureStore({
  reducer: rootReducer,
  devTools,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      thunk: { extraArgument: { history: customHistory } },
    });
  },
});

// store에 저장된 리듀서 타입들이 들어있는 타입
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// reducer타입들을 알고있는 useSelector
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
