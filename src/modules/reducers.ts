import { combineReducers } from "@reduxjs/toolkit";
import {
  commentSlice,
  freeBoardSlice,
  bookSlice,
  searchSlice,
  usedBookDetailSlice,
  userReviewSlice,
  userSlice,
} from "./Slices";

export default combineReducers({
  userReduce: userSlice.reducer,
  commentReduce: commentSlice.reducer,
  bookReduce: bookSlice.reducer,
  usedBookDetailReduce: usedBookDetailSlice.reducer,
  freeBoardReduce: freeBoardSlice.reducer,
  userReviewReduce: userReviewSlice.reducer,
  searchReduce: searchSlice.reducer,
});
