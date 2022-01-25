import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "src/api/http";
import { ReceivedReviewList } from "src/components/UserReview/types";
import { RootState } from "src/modules/store";
import {
  AddUserReviewAsyncSuccess,
  AddUserReviewParam,
  DeleteUserReviewAsyncSuccess,
  DeleteUserReviewParam,
  EditUserReviewAsyncSuccess,
  GetUserReceivedReviewListData,
  GetUserReviewListAsyncSuccess,
} from "./types";

const initialState = {
  userReviewList: [] as GetUserReceivedReviewListData[],
  receivedReviewList: [] as GetUserReceivedReviewListData[],
  list: {
    page: 1,
    pageCount: 0,
    pages: [],
    isEmpty: false,
  } as ReceivedReviewList,
  status: "loading",
};
const name = "userReview";

export interface getUserReviewListParam {
  query: string;
  token: string;
}

// 마이페이지 - 회원리뷰 작성
export const addUserReview = createAsyncThunk<AddUserReviewAsyncSuccess, AddUserReviewParam>(
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

// 마이페이지 - 내가 작성한 회원리뷰 조회
export const getUserReviewList = createAsyncThunk<GetUserReviewListAsyncSuccess, getUserReviewListParam>(
  `${name}/list`,
  async ({ query, token }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/userreview/me?${query}`, {
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
export const getMyReceivedUserReviewList = createAsyncThunk<GetUserReviewListAsyncSuccess, getUserReviewListParam>(
  `${name}/receivedReviewList`,
  async ({ query, token }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/userreview/to-me?${query}`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 마이페이지 - 내가 작성한 회원리뷰 수정
export const editUserReview = createAsyncThunk<EditUserReviewAsyncSuccess, AddUserReviewParam>(
  `${name}/edit`,
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await http.put(`/userreview`, data, {
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
export const deleteUserReview = createAsyncThunk<DeleteUserReviewAsyncSuccess, DeleteUserReviewParam>(
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

const userReviewSlice = createSlice({
  name: "usedBookDetailReduce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 내가 작성한 회원리뷰 조회
      .addCase(getUserReviewList.pending, state => {
        state.status = "loading";
      })
      .addCase(getUserReviewList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list.pageCount = payload.data.pageCount;
        state.list.pages = payload.data.pages;
        if (state.list.pages.length === 0) {
          state.list.isEmpty = true;
        } else {
          state.list.isEmpty = false;
        }
      })
      .addCase(getUserReviewList.rejected, state => {
        state.status = "failed";
      })
      // 내게 달린 회원리뷰 조회
      .addCase(getMyReceivedUserReviewList.pending, state => {
        state.status = "loading";
      })
      .addCase(getMyReceivedUserReviewList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list.pageCount = payload.data.pageCount;
        state.list.pages = payload.data.pages;
        if (state.list.pages.length === 0) {
          state.list.isEmpty = true;
        } else {
          state.list.isEmpty = false;
        }
      })
      .addCase(getMyReceivedUserReviewList.rejected, state => {
        state.status = "failed";
      })
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
      // 회원 리뷰 수정
      .addCase(editUserReview.pending, state => {
        state.status = "loading";
      })
      .addCase(editUserReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        const { data } = payload;
        const { rating, content } = data;
        state.list.pages = state.list.pages.map(v =>
          v.userReviewId !== payload.data.userReviewId ? v : { ...v, content, rating },
        );
        alert("작성한 리뷰를 수정하였습니다.");
      })
      .addCase(editUserReview.rejected, state => {
        state.status = "failed";
        alert("리뷰 수정에 실패했습니다. 다시 한번 등록해주세요.");
      })
      // 회원 리뷰 삭제
      .addCase(deleteUserReview.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteUserReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list.pages = state.list.pages.filter(v => v.userReviewId !== payload.data);
        alert("해당 리뷰를 삭제하였습니다.");
      })
      .addCase(deleteUserReview.rejected, state => {
        state.status = "failed";
        alert("리뷰 삭제에 실패하였습니다. 다시 한번 시도해주세요.");
      });
  },
});

export const userReviewSelector = (state: RootState) => state.userReviewReduce;
export default userReviewSlice;
