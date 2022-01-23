import { combineReducers } from "@reduxjs/toolkit";
import commentSlice from "./Slices/comment/commentSlice";
import getBookSlice from "./Slices/book/bookSlice";
import signInSlice from "./Slices/signIn/signInSlice";
import bookDetailSlice from "./Slices/bookDetail/bookDetailSlice";
import freeBoardSlice from "./Slices/freeBoardSlice/freeBoardSlice";
import usedBookDetailSlice from "./Slices/usedBookDetail/usedBookDetailSlice";
import userReviewSlice from "./Slices/userReview/userReviewSlice";

// 여러 리듀스를 합쳐서 하나로 만들어주는 역할
export default combineReducers({
  signInReduce: signInSlice.reducer,
  commentReduce: commentSlice.reducer,
  bookListReduce: getBookSlice.reducer,
  bookDetailReduce: bookDetailSlice.reducer,
  usedBookDetailReduce: usedBookDetailSlice.reducer,
  freeBoardReduce: freeBoardSlice.reducer,
  userReviewReduce: userReviewSlice.reducer,
});
