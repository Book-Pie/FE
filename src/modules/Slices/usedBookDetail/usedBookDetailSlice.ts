import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import http from "src/api/http";
import { RootState } from "src/modules/store";
import { AddUserReviewAsyncSuccess, AddUserReviewParam, getUserReviewListParam } from "../userReview/types";
import {
  addUsedBookDetailReplyParam,
  BuyBookList,
  deleteUsedBookDetailParam,
  getUsedBookBuyConfirmParam,
  getUsedBookBuyListAsyncSuccess,
  getUsedBookLikeListAsyncSuccess,
  PagesResponse,
  usedBookBuyListResponse,
  UsedBookDetailAsyncSuccess,
  UsedBookDetailFail,
  usedBookDetailReplyListAsyncSuccess,
  usedBookDetailReplyResponse,
  UsedBookDetailResponse,
  UsedBookDetailThunk,
  UsedBookLikeAsyncSuccess,
  usedBookLikeParam,
  UsedBookViewAsyncSuccess,
} from "./types";

const initialState = {
  content: {} as UsedBookDetailResponse,
  replyList: [] as usedBookDetailReplyResponse[],
  likeList: [] as PagesResponse[],
  buyList: [] as usedBookBuyListResponse[],
  list: {
    page: 1,
    pageCount: 0,
    pages: [],
    isEmpty: false,
  } as BuyBookList,
  category: {},
  status: "loading",
};
const name = "usedBookDetail";
const myPage = "myPage";

// 중고장터 상세 페이지
export const usedBookDetailAsync = createAsyncThunk<UsedBookDetailAsyncSuccess, string, UsedBookDetailThunk>(
  `${name}/bookAsync`,
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await http.get(`/usedbook/${id}`);
      const { data } = response;
      const { success } = data;
      if (!success) {
        if (data.error.code === 200) {
          return console.log(data);
        }
      }
      dispatch(usedBookView(id));
      dispatch(usedBookDetailReplyList(id));
      return data;
    } catch (err) {
      const error = err as AxiosError<UsedBookDetailFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.message);
    }
  },
);

// 중고장터 좋아요 추가 및 취소
export const usedBookLike = createAsyncThunk<UsedBookLikeAsyncSuccess, usedBookLikeParam>(
  `${name}/like`,
  async ({ usedBookId }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/usedbook/like/${usedBookId}`, usedBookId);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 조회수 증가
export const usedBookView = createAsyncThunk<UsedBookViewAsyncSuccess, string>(
  `${name}/view`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.post(`/usedbook/view/${id}`, id);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 댓글 리스트
export const usedBookDetailReplyList = createAsyncThunk<usedBookDetailReplyListAsyncSuccess, string>(
  `${name}/replyList`,
  async (id, { rejectWithValue }) => {
    try {
      const response = await http.get(`/reply/usedbook/${id}`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 댓글 작성
export const addUsedBookDetailReply = createAsyncThunk<UsedBookLikeAsyncSuccess, addUsedBookDetailReplyParam>(
  `${name}/addReply`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post(`/reply/usedbook`, data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 댓글 삭제
export const deleteUsedBookDetailReply = createAsyncThunk(
  `${name}/deleteReply`,
  async ({ id }: deleteUsedBookDetailParam, { rejectWithValue }) => {
    try {
      await http.delete(`/reply/usedbook/${id}`);
      return id;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 마이페이지 - 중고장터 찜 목록
export const getUsedBookLikeList = createAsyncThunk<getUsedBookLikeListAsyncSuccess, string>(
  `${myPage}/${name}/like/list`,
  async (token, { rejectWithValue }) => {
    try {
      const response = await http.get(`/usedbook/like`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 마이페이지 - 중고장터 구매 목록
export const getUsedBookBuyList = createAsyncThunk<getUsedBookBuyListAsyncSuccess, getUserReviewListParam>(
  `${myPage}/${name}/buy/list`,
  async ({ query, token }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/order/buyer?${query}`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 마이페이지 - 중고장터 구매확정
export const usedBookBuyConfirm = createAsyncThunk<string, getUsedBookBuyConfirmParam>(
  `${myPage}/${name}/buy/confirm`,
  async ({ token, orderId }, { rejectWithValue }) => {
    try {
      await http.post(`/order/end/${orderId}`, {
        headers: { "X-AUTH-TOKEN": token },
      });
      return orderId;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

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

const usedBookDetailSlice = createSlice({
  name: "usedBookDetailReduce",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // 중고 상품 상세 페이지
      .addCase(usedBookDetailAsync.pending, state => {
        state.status = "loading";
      })
      .addCase(usedBookDetailAsync.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content = payload.data;
      })
      .addCase(usedBookDetailAsync.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 좋아요 추가 및 취소
      .addCase(usedBookLike.pending, state => {
        state.status = "loading";
      })
      .addCase(usedBookLike.fulfilled, (state, { payload }) => {
        state.status = "success";
        if (payload.data === "created") {
          state.content.likeCount = Number(state.content.likeCount) + 1;
        }
        if (payload.data === "deleted") {
          state.content.likeCount = Number(state.content.likeCount) - 1;
        }
      })
      .addCase(usedBookLike.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 조회수 증가
      .addCase(usedBookView.pending, state => {
        state.status = "loading";
      })
      .addCase(usedBookView.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.content.view = payload.data;
      })
      .addCase(usedBookView.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 댓글 리스트
      .addCase(usedBookDetailReplyList.pending, state => {
        state.status = "loading";
      })
      .addCase(usedBookDetailReplyList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.replyList = payload.data.content;
      })
      .addCase(usedBookDetailReplyList.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 댓글 작성
      .addCase(addUsedBookDetailReply.pending, state => {
        state.status = "loading";
      })
      .addCase(addUsedBookDetailReply.fulfilled, state => {
        state.status = "success";
      })
      .addCase(addUsedBookDetailReply.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 댓글 삭제
      .addCase(deleteUsedBookDetailReply.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteUsedBookDetailReply.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.replyList = state.replyList.filter(comment => comment.replyId !== payload);
      })
      .addCase(deleteUsedBookDetailReply.rejected, state => {
        state.status = "failed";
      })
      // 마이페이지 - 중고장터 찜 목록
      .addCase(getUsedBookLikeList.pending, state => {
        state.status = "loading";
      })
      .addCase(getUsedBookLikeList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.likeList = payload.data;
      })
      .addCase(getUsedBookLikeList.rejected, state => {
        state.status = "failed";
      })
      // 마이페이지 - 중고장터 구매 목록
      .addCase(getUsedBookBuyList.pending, state => {
        state.status = "loading";
      })
      .addCase(getUsedBookBuyList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list.pageCount = payload.data.pageCount;
        state.list.pages = payload.data.pages;
        if (state.list.pages.length === 0) {
          state.list.isEmpty = true;
        } else {
          state.list.isEmpty = false;
        }
      })
      .addCase(getUsedBookBuyList.rejected, state => {
        state.status = "failed";
      })
      // 마이페이지 - 중고장터 구매확정
      .addCase(usedBookBuyConfirm.pending, state => {
        state.status = "loading";
      })
      .addCase(usedBookBuyConfirm.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.list.pages.map(v => (v.orderId !== payload ? v : { ...v, state: "SOLD_OUT" }));
        alert("구매확정이 완료되었습니다.");
      })
      .addCase(usedBookBuyConfirm.rejected, state => {
        state.status = "failed";
      })
      // 회원 리뷰 작성
      .addCase(addUserReview.pending, state => {
        state.status = "loading";
      })
      .addCase(addUserReview.fulfilled, (state, { payload }) => {
        state.status = "success";
        const { data } = payload;
        const { orderId } = data;
        state.list.pages = state.list.pages.map(v =>
          v.orderId !== String(orderId) ? v : { ...v, reviewId: data.reviewId },
        );
        alert("중고거래 리뷰를 작성해주셔서 감사합니다.");
      })
      .addCase(addUserReview.rejected, state => {
        state.status = "failed";
        alert("리뷰 작성에 실패했습니다. 다시 한번 등록해주세요.");
      });
  },
});

export const usedBookSelector = (state: RootState) => state.usedBookDetailReduce;
export const buyListSelector = (state: RootState) => state.usedBookDetailReduce.buyList;

export default usedBookDetailSlice;
