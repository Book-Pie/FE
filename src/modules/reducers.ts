import { combineReducers } from "@reduxjs/toolkit";
import * as slices from "./Slices";

export default combineReducers({
  userReduce: slices.userSlice.reducer,
  commentReduce: slices.commentSlice.reducer,
  bookReduce: slices.bookSlice.reducer,
  usedBookDetailReduce: slices.usedBookDetailSlice.reducer,
  freeBoardReduce: slices.freeBoardSlice.reducer,
  userReviewReduce: slices.userReviewSlice.reducer,
  searchReduce: slices.searchSlice.reducer,
});
