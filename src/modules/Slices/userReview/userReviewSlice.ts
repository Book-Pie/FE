import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "src/api/http";
import { RootState } from "src/modules/store";
import { addUserReviewAsyncSuccess, addUserReviewParam } from "./types";

const initialState = {
  userReviewList: [],
  status: "loading",
};
const name = "userReview";

// 마이페이지 - 회원리뷰 작성
export const addUserReview = createAsyncThunk<addUserReviewAsyncSuccess, addUserReviewParam>(
  `${name}/add`,
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/userreview`, data, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

const userReviewSlice = createSlice({
  name: "usedBookDetailReduce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 회원 리뷰 작성
      .addCase(addUserReview.pending, state => {
        state.status = "loading";
      })
      .addCase(addUserReview.fulfilled, state => {
        state.status = "success";
        alert("중고거래 리뷰를 작성해주셔서 감사합니다.");
      })
      .addCase(addUserReview.rejected, state => {
        state.status = "failed";
        alert("리뷰 작성에 실패했습니다. 다시 한번 등록해주세요.");
      });
  },
});

export const userReviewSelector = (state: RootState) => state.userReviewReduce;
export default userReviewSlice;
