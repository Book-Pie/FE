import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "src/api/http";
import { RootState } from "src/modules/store";
import {
  addUserReviewAsyncSuccess,
  addUserReviewParam,
  deleteUserReviewAsyncSuccess,
  deleteUserReviewParam,
  getUserReceivedReviewListData,
  getUserReviewListAsyncSuccess,
} from "./types";

const initialState = {
  userReviewList: [] as getUserReceivedReviewListData[],
  receivedReviewList: [] as getUserReceivedReviewListData[],
  status: "loading",
};
const name = "userReview";

// 마이페이지 - 회원리뷰 작성
export const addUserReview = createAsyncThunk<addUserReviewAsyncSuccess, addUserReviewParam>(
  `${name}/add`,
  async ({ data, token }, { rejectWithValue, extra }) => {
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

// 마이페이지 - 내가 작성한 회원리뷰 조회
export const getUserReviewList = createAsyncThunk<getUserReviewListAsyncSuccess, string>(
  `${name}/list`,
  async (token, { rejectWithValue }) => {
    try {
      const response = await http.get(`/userreview/me`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 마이페이지 - 내가 작성한 회원리뷰 삭제
export const deleteUserReview = createAsyncThunk<deleteUserReviewAsyncSuccess, deleteUserReviewParam>(
  `${name}/delete`,
  async ({ userReviewId, token }, { rejectWithValue }) => {
    try {
      const response = await http.delete(`/userreview/${userReviewId}`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 마이페이지 - 내게 달린 회원리뷰 조회
export const getMyReceivedUserReviewList = createAsyncThunk<getUserReviewListAsyncSuccess, string>(
  `${name}/receivedReviewList`,
  async (token, { rejectWithValue }) => {
    try {
      const response = await http.get(`/userreview/to-me`, {
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
      })
      // 회원 리뷰 조회
      .addCase(getUserReviewList.pending, state => {
        state.status = "loading";
      })
      .addCase(getUserReviewList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.userReviewList = payload.data.pages;
      })
      .addCase(getUserReviewList.rejected, state => {
        state.status = "failed";
      })
      // 회원 리뷰 삭제
      .addCase(deleteUserReview.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteUserReview.fulfilled, state => {
        state.status = "success";
      })
      .addCase(deleteUserReview.rejected, state => {
        state.status = "failed";
      })
      // 내게 달린 회원리뷰 조회
      .addCase(getMyReceivedUserReviewList.pending, state => {
        state.status = "loading";
      })
      .addCase(getMyReceivedUserReviewList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.receivedReviewList = payload.data.pages;
      })
      .addCase(getMyReceivedUserReviewList.rejected, state => {
        state.status = "failed";
      });
  },
});

export const userReviewSelector = (state: RootState) => state.userReviewReduce;
export default userReviewSlice;
