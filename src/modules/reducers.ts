import { combineReducers } from "@reduxjs/toolkit";
import signInSlice from "./Slices/signInSlice";
import commentSlice from "./Slices/commentSlice";

// 여러 리듀스를 합쳐서 하나로 만들어주는 역할
export default combineReducers({
  signInReduce: signInSlice.reducer,
  commentReduce: commentSlice,
});
