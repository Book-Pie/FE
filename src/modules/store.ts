import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createBrowserHistory } from "history";
import rootReducer from "./reducers";

export const customHistory = createBrowserHistory();

const middleware = {
  thunk: { extraArgument: { history: customHistory } },
};

const store = configureStore({
  devTools: process.env.REDUX_DEV_TOOL ? true : false,
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(middleware),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
