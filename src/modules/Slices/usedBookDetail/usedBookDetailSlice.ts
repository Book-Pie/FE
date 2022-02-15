import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeAuthTokenHeader, http, errorHandler } from "src/api/client";
import { RootState } from "modules/store";
import {
  AddUsedBookDetailSubReplyParam,
  AddUserReviewAsyncSuccess,
  AddUserReviewParam,
  EditUsedBookDetailSubReply,
  GetRelatedUsedBookListAsyncSuccess,
  GetRelatedUsedBookListParam,
  GetStoreUserReviewAsyncSuccess,
  GetStoreUserReviewListParam,
  GetUserReviewListParam,
} from "../userReview/types";
import {
  AddUsedBookDetailReplyAsyncSuccess,
  AddUsedBookDetailReplyParam,
  DeleteUsedBookDetailParam,
  DeleteUsedBookDetailSubReply,
  EditUsedBookDetailReplyParam,
  GetUsedBookBuyConfirmParam,
  GetUsedBookBuyListAsyncSuccess,
  GetUsedBookLikeListAsyncSuccess,
  UsedBookDetailAsyncSuccess,
  UsedBookDetailReduce,
  UsedBookDetailReplyListAsyncSuccess,
  UsedBookDetailReplyListParam,
  UsedBookDetailThunk,
  UsedBookLikeAsyncSuccess,
  UsedBookLikeParam,
  UsedBookThunkApi,
  UsedBookViewAsyncSuccess,
} from "./types";

const initialState: UsedBookDetailReduce = {
  content: {},
  replyList: [],
  likeList: [],
  buyList: [],
  relatedUsedBookList: [],
  liked: false,
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
  storeReviewListTotal: 0,
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
      dispatch(usedBookView(id));
      return response.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 중고장터 좋아요 추가 및 취소
export const usedBookLike = createAsyncThunk<UsedBookLikeAsyncSuccess, UsedBookLikeParam>(
  `${name}/like`,
  async ({ usedBookId, token }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/usedbook/like/${usedBookId}`, usedBookId, makeAuthTokenHeader(token));
      return response.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
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
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 중고장터 댓글 리스트
export const usedBookDetailReplyList = createAsyncThunk<
  UsedBookDetailReplyListAsyncSuccess,
  UsedBookDetailReplyListParam
>(`${name}/replyList`, async ({ usedBookId, page }, { rejectWithValue }) => {
  try {
    const response = await http.get(`/reply/usedbook/${usedBookId}?page=${page}&size=5`);
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    return rejectWithValue(message);
  }
});

// 중고장터 댓글 작성
export const addUsedBookDetailReply = createAsyncThunk<
  AddUsedBookDetailReplyAsyncSuccess,
  AddUsedBookDetailReplyParam,
  UsedBookThunkApi
>(`${name}/addReply`, async (data, { rejectWithValue, getState }) => {
  try {
    const { userReduce } = getState();
    const { token } = userReduce;
    if (!token) throw new Error("로그인이 필요합니다.");
    const response = await http.post(`/reply/usedbook`, data, makeAuthTokenHeader(token));
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    return rejectWithValue(message);
  }
});

// 중고장터 댓글 수정
export const editUsedBookDetailReply = createAsyncThunk<
  AddUsedBookDetailReplyAsyncSuccess,
  EditUsedBookDetailReplyParam,
  UsedBookThunkApi
>(`${name}/editReply`, async (data, { rejectWithValue, getState }) => {
  try {
    const { userReduce } = getState();
    const { token } = userReduce;
    if (!token) throw new Error("로그인이 필요합니다.");
    const response = await http.put(`/reply/usedbook/`, data, makeAuthTokenHeader(token));
    return response.data;
  } catch (error) {
    const message = errorHandler(error);
    return rejectWithValue(message);
  }
});

// 중고장터 댓글 삭제
export const deleteUsedBookDetailReply = createAsyncThunk<any, DeleteUsedBookDetailParam, UsedBookThunkApi>(
  `${name}/deleteReply`,
  async ({ id }: DeleteUsedBookDetailParam, { rejectWithValue, getState }) => {
    try {
      const { userReduce } = getState();
      const { token } = userReduce;
      if (!token) throw new Error("로그인이 필요합니다.");
      await http.delete(`/reply/usedbook/${id}`, makeAuthTokenHeader(token));
      return id;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 중고장터 상점후기
export const getStoreUserReviewList = createAsyncThunk<GetStoreUserReviewAsyncSuccess, GetStoreUserReviewListParam>(
  `${name}/storeUserReviewList`,
  async ({ sellerId, page }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/userreview/${sellerId}?page=${page}&limit=3`);
      return response.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
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
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 중고장터 대댓글 작성
export const addUsedBookDetailSubReply = createAsyncThunk<string, AddUsedBookDetailSubReplyParam, UsedBookThunkApi>(
  `${name}/add/subReply`,
  async ({ content, page, parentReplyId, usedBookId, userId }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { userReduce } = getState();
      const { token } = userReduce;
      if (!token) throw new Error("로그인이 필요합니다.");
      await http.post(`/reply`, { userId, parentReplyId, content }, makeAuthTokenHeader(token));
      dispatch(usedBookDetailReplyList({ usedBookId, page }));
      return "댓글 작성완료";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 중고장터 대댓글 수정
export const editUsedBookDetailSubReply = createAsyncThunk<string, EditUsedBookDetailSubReply, UsedBookThunkApi>(
  `${name}/edit/subReply`,
  async ({ replyId, content, usedBookId, page }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { userReduce } = getState();
      const { token } = userReduce;
      if (!token) throw new Error("로그인이 필요합니다.");
      await http.put(`/reply`, { replyId, content }, makeAuthTokenHeader(token));
      dispatch(usedBookDetailReplyList({ usedBookId, page }));
      return "수정완료 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 중고장터 대댓글 삭제
export const deleteUsedBookDetailSubReply = createAsyncThunk<string, DeleteUsedBookDetailSubReply, UsedBookThunkApi>(
  `${name}/delete/subReply`,
  async ({ replyId, usedBookId, page }, { rejectWithValue, dispatch, getState }) => {
    try {
      const { userReduce } = getState();
      const { token } = userReduce;
      if (!token) throw new Error("로그인이 필요합니다.");
      await http.delete(`/reply/${replyId}`, makeAuthTokenHeader(token));
      dispatch(usedBookDetailReplyList({ usedBookId, page }));
      return "삭제완료 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 마이페이지 - 중고장터 찜 목록
export const getUsedBookLikeList = createAsyncThunk<GetUsedBookLikeListAsyncSuccess, string>(
  `${myPage}/${name}/like/list`,
  async (token, { rejectWithValue }) => {
    try {
      const response = await http.get(`/usedbook/like`, makeAuthTokenHeader(token));
      return response.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 마이페이지 - 중고장터 구매 목록
export const getUsedBookBuyList = createAsyncThunk<GetUsedBookBuyListAsyncSuccess, GetUserReviewListParam>(
  `${myPage}/${name}/buy/list`,
  async ({ query, token }, { rejectWithValue }) => {
    try {
      const response = await http.get(`/order/buyer?${query}`, makeAuthTokenHeader(token));
      return response.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 마이페이지 - 중고장터 구매확정
export const usedBookBuyConfirm = createAsyncThunk<string, GetUsedBookBuyConfirmParam>(
  `${myPage}/${name}/buy/confirm`,
  async ({ token, orderId }, { rejectWithValue }) => {
    try {
      await http.post(`/order/end/${orderId}`, {}, makeAuthTokenHeader(token));
      return orderId;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

// 마이페이지 - 회원리뷰 작성
export const addUserReview = createAsyncThunk<AddUserReviewAsyncSuccess, AddUserReviewParam>(
  `${name}/add`,
  async ({ data, token }, { rejectWithValue }) => {
    try {
      const response = await http.post(`/userreview`, data, makeAuthTokenHeader(token));
      return response.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
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
          state.content.liked = true;
        }
        if (payload.data === "deleted") {
          state.content.likeCount = Number(state.content.likeCount) - 1;
          state.content.liked = false;
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
        state.storeReviewListTotal = payload.data.totalElement;
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
