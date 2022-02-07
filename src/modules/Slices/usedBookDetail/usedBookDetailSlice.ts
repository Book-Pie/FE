import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import http from "api/http";
import { RootState } from "modules/store";
import {
  AddUsedBookDetailSubReplyParam,
  AddUserReviewAsyncSuccess,
  AddUserReviewParam,
  EditUsedBookDetailSubReply,
  GetRelatedUsedBookListAsyncSuccess,
  GetRelatedUsedBookListParam,
  GetStoreUserReviewAsyncSuccess,
  getStoreUserReviewListParam,
  getUserReviewListParam,
  ThunkApi,
} from "../userReview/types";
import {
  AddUsedBookDetailReplyAsyncSuccess,
  AddUsedBookDetailReplyParam,
  DeleteUsedBookDetailParam,
  DeleteUsedBookDetailSubReply,
  editUsedBookDetailReplyParam,
  GetUsedBookBuyConfirmParam,
  getUsedBookBuyListAsyncSuccess,
  getUsedBookLikeListAsyncSuccess,
  UsedBookDetailAsyncSuccess,
  UsedBookDetailFail,
  UsedBookDetailReduce,
  usedBookDetailReplyListAsyncSuccess,
  UsedBookDetailReplyListParam,
  UsedBookDetailThunk,
  UsedBookLikeAsyncSuccess,
  UsedBookLikeParam,
  UsedBookViewAsyncSuccess,
} from "./types";

const initialState: UsedBookDetailReduce = {
  content: {},
  replyList: [],
  likeList: [],
  buyList: [],
  relatedUsedBookList: [],
  // 마이페이지
  list: {
    page: 1,
    pageCount: 0,
    pages: [],
    isEmpty: false,
  },
  // 상점후기
  storeReviewList: [],
  pageCount: 0,
  // 상품문의
  totalElements: 0,
  totalPages: 0,
  pageNumber: 0,
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
      return data;
    } catch (err) {
      const error = err as AxiosError<UsedBookDetailFail>;
      if (!error.response) throw err;
      return rejectWithValue(error.message);
    }
  },
);

// 중고장터 좋아요 추가 및 취소
export const usedBookLike = createAsyncThunk<UsedBookLikeAsyncSuccess, UsedBookLikeParam>(
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
export const usedBookDetailReplyList = createAsyncThunk<
  usedBookDetailReplyListAsyncSuccess,
  UsedBookDetailReplyListParam
>(`${name}/replyList`, async ({ usedBookId, page }, { rejectWithValue }) => {
  try {
    const response = await http.get(`/reply/usedbook/${usedBookId}?page=${page}&size=5`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 중고장터 댓글 작성
export const addUsedBookDetailReply = createAsyncThunk<AddUsedBookDetailReplyAsyncSuccess, AddUsedBookDetailReplyParam>(
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

// 중고장터 댓글 수정
export const editUsedBookDetailReply = createAsyncThunk<
  AddUsedBookDetailReplyAsyncSuccess,
  editUsedBookDetailReplyParam
>(`${name}/editReply`, async (data, { rejectWithValue }) => {
  try {
    const response = await http.put(`/reply/usedbook/`, data);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

// 중고장터 댓글 삭제
export const deleteUsedBookDetailReply = createAsyncThunk(
  `${name}/deleteReply`,
  async ({ id }: DeleteUsedBookDetailParam, { rejectWithValue }) => {
    try {
      await http.delete(`/reply/usedbook/${id}`);
      return id;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 상점후기
export const getStoreUserReviewList = createAsyncThunk<GetStoreUserReviewAsyncSuccess, getStoreUserReviewListParam>(
  `${name}/storeUserReviewList`,
  async ({ sellerId, page }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/userreview/${sellerId}?page=${page}&limit=3`);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 연관 중고도서리스트
export const getRelatedUsedBookList = createAsyncThunk<GetRelatedUsedBookListAsyncSuccess, GetRelatedUsedBookListParam>(
  `${name}/relatedUsedBookList`,
  async (data, { rejectWithValue }) => {
    try {
      const response = await http.post(`/usedbook/recommendation`, data);
      return response.data;
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 대댓글 작성
export const addUsedBookDetailSubReply = createAsyncThunk<string, AddUsedBookDetailSubReplyParam, ThunkApi>(
  `${name}/add/subReply`,
  async ({ content, page, parentReplyId, usedBookId, userId }, { rejectWithValue, dispatch }) => {
    try {
      await http.post(`/reply`, { userId, parentReplyId, content });
      dispatch(usedBookDetailReplyList({ usedBookId, page }));
      return "댓글 작성완료";
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 대댓글 수정
export const editUsedBookDetailSubReply = createAsyncThunk<string, EditUsedBookDetailSubReply, ThunkApi>(
  `${name}/edit/subReply`,
  async ({ replyId, content, usedBookId, page }, { rejectWithValue, dispatch }) => {
    try {
      await http.put(`/reply`, { replyId, content });
      dispatch(usedBookDetailReplyList({ usedBookId, page }));
      return "수정완료 되었습니다.";
    } catch (error: any) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 중고장터 대댓글 삭제
export const deleteUsedBookDetailSubReply = createAsyncThunk<string, DeleteUsedBookDetailSubReply, ThunkApi>(
  `${name}/delete/subReply`,
  async ({ replyId, usedBookId, page }, { rejectWithValue, dispatch }) => {
    try {
      await http.delete(`/reply/${replyId}`);
      dispatch(usedBookDetailReplyList({ usedBookId, page }));
      return "삭제완료 되었습니다.";
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
export const usedBookBuyConfirm = createAsyncThunk<string, GetUsedBookBuyConfirmParam>(
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
  reducers: {
    setReviewInit: state => {
      state.replyList = [];
    },
  },
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
        state.totalElements = payload.data.totalElements;
        state.totalPages = payload.data.totalPages;
        state.pageNumber = payload.data.pageable.pageNumber;
      })
      .addCase(usedBookDetailReplyList.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 댓글 작성
      .addCase(addUsedBookDetailReply.pending, state => {
        state.status = "loading";
      })
      .addCase(addUsedBookDetailReply.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.replyList.unshift(payload.data);
        state.totalElements += 1;
      })
      .addCase(addUsedBookDetailReply.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 댓글 수정
      .addCase(editUsedBookDetailReply.pending, state => {
        state.status = "loading";
      })
      .addCase(editUsedBookDetailReply.fulfilled, (state, { payload }) => {
        state.status = "success";
        const { replyId, content, secret } = payload.data;
        state.replyList = state.replyList.map(v => (v.replyId !== replyId ? v : { ...v, content, secret }));
      })
      .addCase(editUsedBookDetailReply.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 댓글 삭제
      .addCase(deleteUsedBookDetailReply.pending, state => {
        state.status = "loading";
      })
      .addCase(deleteUsedBookDetailReply.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.replyList = state.replyList.filter(comment => comment.replyId !== payload);
        state.totalElements -= 1;
      })
      .addCase(deleteUsedBookDetailReply.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 상점후기
      .addCase(getStoreUserReviewList.pending, state => {
        state.status = "loading";
      })
      .addCase(getStoreUserReviewList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.storeReviewList = payload.data.pages;
        state.pageCount = payload.data.pageCount;
      })
      .addCase(getStoreUserReviewList.rejected, state => {
        state.status = "failed";
      })
      // 중고장터 연관상품 리스트
      .addCase(getRelatedUsedBookList.pending, state => {
        state.status = "loading";
      })
      .addCase(getRelatedUsedBookList.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.relatedUsedBookList = payload.data;
      })
      .addCase(getRelatedUsedBookList.rejected, state => {
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

export const usedBookDetailSelector = (state: RootState) => state.usedBookDetailReduce;
export const buyListSelector = (state: RootState) => state.usedBookDetailReduce.buyList;
export const { setReviewInit } = usedBookDetailSlice.actions;
export default usedBookDetailSlice;
