import { combineReducers } from "@reduxjs/toolkit";
import getBookSlice from "./Slices/bookSlice";
import getRecentlyBookSlice from "./Slices/usedbookSlice";
import signInSlice from "./Slices/signIn/signInSlice";

// 여러 리듀스를 합쳐서 하나로 만들어주는 역할
export default combineReducers({
  signInReduce: signInSlice.reducer,
  bookListReduce: getBookSlice.reducer,
  recentlyBookListReduce: getRecentlyBookSlice.reducer,
});
