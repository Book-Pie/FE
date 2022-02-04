import { createAsyncThunk, createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import client, { errorHandler } from "api/client";
import { RootState } from "modules/store";

import { getFreeBoardPage } from "utils/localStorageUtil";
import * as Types from "./types";

const name = "freeboardReduce";

export const freeboardUpdateAsync = createAsyncThunk<string, Types.FreeboardUpdateAsyncPayload, Types.ThunkApi>(
  `${name}/freeboardUpdateAsync`,
  async (payload, { extra, rejectWithValue, dispatch, getState }) => {
    const { history } = extra;
    const { freeBoardReduce } = getState();
    const { list } = freeBoardReduce;
    try {
      const page = list?.page ?? getFreeBoardPage() ?? 0;
      const { success } = await client.put<Types.FreeboardUpdateAsyncPayload, Types.FreeboardUpdateResponse>(
        "/board",
        payload,
      );
      if (!success) throw new Error("수정에 실패했습니다.");
      dispatch(freeboardsAsync(page));
      history.replace("/community/freeboard");
      return "수정에 성공했습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const freeboardInsertAsync = createAsyncThunk<void, Types.FreeboardInsertAsyncPayload, Types.ThunkApi>(
  `${name}/freeboardInsertAsync`,
  async (payload, { extra, rejectWithValue, dispatch, getState }) => {
    const { history } = extra;
    const { freeBoardReduce } = getState();
    const { list, keyWord } = freeBoardReduce;
    try {
      const page = list?.page ?? getFreeBoardPage() ?? 0;
      const { success } = await client.post<Types.FreeboardInsertAsyncPayload, Types.FreeboardInsertResponse>(
        "/board",
        payload,
      );
      if (!success) throw new Error("등록에 실패했습니다.");
      dispatch(setContentInit());
      if (keyWord) {
        dispatch(freeboardsAsync(0));
      } else {
        dispatch(freeboardsAsync(page));
      }
      history.replace("/community/freeboard");
      return undefined;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const freeboardDeleteAsync = createAsyncThunk<string, string, Types.ThunkApi>(
  `${name}/freeboardDeleteAsync`,
  async (boardId, { extra, rejectWithValue, getState, dispatch }) => {
    const { freeBoardReduce } = getState();
    const { list, keyWord } = freeBoardReduce;
    const { history } = extra;
    try {
      if (list) {
        const { page, contents } = list;
        const { data } = await client.delete(`/board/${boardId}`);
        if (data.success === false) throw new Error("삭제에 실패했습니다.");

        if (keyWord) {
          if (contents[page].length === 1) {
            dispatch(freeboardsByTitleAsync({ keyWord, page: page - 1 }));
          } else {
            dispatch(freeboardsByTitleAsync({ keyWord, page }));
          }
        } else if (contents[page].length === 1) {
          dispatch(freeboardsAsync(String(page - 1)));
        } else {
          dispatch(freeboardsAsync(String(page)));
        }

        history.replace("/community/freeboard");
      }
      return boardId;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const freeboardsByTitleAsync = createAsyncThunk<
  Types.Freeboards,
  { keyWord: string; page: number | string },
  Types.ThunkApi
>(`${name}/freeboardsByTitleAsync`, async ({ keyWord, page }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await client.get(`/board/search?boardType=FREE&size=5&keyWord=${keyWord}&page=${page}`);
    dispatch(setKeyWord(keyWord));
    return data;
  } catch (error) {
    const message = errorHandler(error);
    return rejectWithValue(message);
  }
});

export const freeboardsAsync = createAsyncThunk<Types.Freeboards, string | number, Types.ThunkApi>(
  `${name}/freeboardsAsync`,
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/board/getAll?boardType=FREE&size=5&page=${page}`);
      return data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const freeboardInfoAsync = createAsyncThunk<Types.Content, string, Types.ThunkApi>(
  `${name}/freeboardInfoAsync`,
  async (boardId, { rejectWithValue }) => {
    try {
      const { data } = await client.get(`/board/${boardId}`);
      return data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const freeboardCommentsAsync = createAsyncThunk<
  Types.FreeboardCommentsAsyncSuccess,
  Types.FreeboardCommentsParam,
  Types.ThunkApi
>(`${name}/freeboardCommentsAsync`, async ({ boardId, page, isReload }, { rejectWithValue }) => {
  try {
    const { data } = await client.get(`/reply/board/${boardId}?page=${page}&size=5`);
    return {
      boardId: Number(boardId),
      comments: data,
      isReload,
    };
  } catch (error) {
    const message = errorHandler(error);
    return rejectWithValue(message);
  }
});

export const freeboardCommentInsertAsync = createAsyncThunk<void, Types.FreeboardInsertParam, Types.ThunkApi>(
  `${name}/freeboardCommentInsertAsync`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { boardId } = payload;
      await client.post("/reply/board", payload);
      dispatch(freeboardCommentsAsync({ boardId, page: 0, isReload: true }));
      return undefined;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const freeboardCommentDeleteAsync = createAsyncThunk<string, Types.FreeboardDeleteParam, Types.ThunkApi>(
  `${name}/freeboardCommentDeleteAsync`,
  async ({ boardId, replyId }, { rejectWithValue, dispatch }) => {
    try {
      await client.delete(`/reply/board/${replyId}`);
      dispatch(freeboardCommentsAsync({ boardId, page: 0, isReload: true }));
      return "삭제가 완료되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);
export const freeboardCommentUpdateAsync = createAsyncThunk<string, Types.FreeboardUpdateParam, Types.ThunkApi>(
  `${name}/freeboardCommentUpdateAsync`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await client.put("/reply/board", payload);
      dispatch(freeboardCommentsAsync({ boardId: data.boardId, page: 0, isReload: true }));
      return "업데이트가 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const subReplyInsertAsync = createAsyncThunk<void, Types.SubReplyInsertParam, Types.ThunkApi>(
  `${name}/subRelyInsertAsync`,
  async ({ boardId, payload }, { rejectWithValue, dispatch }) => {
    try {
      await client.post("/reply", payload);
      dispatch(freeboardCommentsAsync({ boardId, page: 0, isReload: true }));
      return undefined;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const subReplyDeleteAsync = createAsyncThunk<string, Types.SubReplyDeleteParam, Types.ThunkApi>(
  `${name}/subRelyInsertAsync`,
  async ({ boardId, subReplyId }, { rejectWithValue, dispatch }) => {
    try {
      await client.delete(`/reply/${subReplyId}`);
      dispatch(freeboardCommentsAsync({ boardId, page: 0, isReload: true }));
      return "삭제가 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const subReplyUpdateAsync = createAsyncThunk<string, Types.SubReplyUpdateParam, Types.ThunkApi>(
  `${name}/subRelyInsertAsync`,
  async ({ boardId, payload }, { rejectWithValue, dispatch }) => {
    try {
      await client.put("/reply", payload);
      dispatch(freeboardCommentsAsync({ boardId, page: 0, isReload: true }));
      return "업데이트가 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

const initialState: Types.FreeBoardReduce = {
  status: "idle",
  error: null,
  list: null,
  info: null,
  keyWord: null,
  coList: null,
};

const freeBoardSlice = createSlice({
  name,
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      const { list } = state;
      if (list) list.page = action.payload;
    },
    setKeyWord: (state, action: PayloadAction<string>) => {
      state.keyWord = action.payload;
    },
    setContentInit: state => {
      state.list = null;
      state.keyWord = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(freeboardInsertAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardInsertAsync.fulfilled, state => {
      state.status = "idle";
    });
    builder.addCase(freeboardInsertAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(freeboardsByTitleAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardsByTitleAsync.fulfilled, (state, { payload }) => {
      const {
        content,
        empty,
        first,
        last,
        size,
        totalPages,
        pageable: { pageNumber },
      } = payload;

      if (state.list) {
        state.list = null;
        state.list = {
          empty,
          first,
          last,
          size,
          totalPages,
          page: pageNumber,
          contents: {
            [pageNumber]: content,
          },
        };
      }

      state.status = "idle";
    });
    builder.addCase(freeboardsByTitleAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(freeboardsAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardsAsync.fulfilled, (state, { payload }) => {
      const {
        content,
        empty,
        first,
        last,
        size,
        totalPages,
        pageable: { pageNumber },
      } = payload;

      if (state.list) {
        state.list.empty = empty;
        state.list.first = first;
        state.list.last = last;
        state.list.totalPages = totalPages;
        state.list.page = pageNumber;
        state.list.contents = {
          ...state.list.contents,
          [pageNumber]: content,
        };
      } else {
        state.list = {
          empty,
          first,
          last,
          size,
          totalPages,
          page: pageNumber,
          contents: {
            [pageNumber]: content,
          },
        };
      }
      state.keyWord = null;
      state.status = "idle";
    });
    builder.addCase(freeboardsAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(freeboardInfoAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardInfoAsync.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.info = payload;
    });
    builder.addCase(freeboardInfoAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(freeboardDeleteAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardDeleteAsync.fulfilled, (state, { payload }) => {
      const { list } = state;
      if (list) {
        const { size } = list;
        const contents = current(list.contents);
        const array: Types.Content[] = [];
        const key = Object.keys(contents)[0];

        Object.values(contents).forEach(value => array.push(...value));
        let index = Number(key);

        const newContents = array
          .filter(content => content.boardId !== Number(payload))
          .reduce((acc: Types.Contents, cur: Types.Content, idx) => {
            if (idx !== 0 && idx % size === 0) index += 1;
            if (acc[index]) {
              acc[index].push(cur);
              return acc;
            }
            return {
              ...acc,
              [index]: [cur],
            };
          }, {});
        list.contents = newContents;
        const keys = Object.keys(newContents);
        list.totalPages = Number(keys[keys.length - 1]) + 1;
      }
      state.status = "idle";
    });
    builder.addCase(freeboardDeleteAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(freeboardUpdateAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardUpdateAsync.fulfilled, state => {
      state.status = "idle";
    });
    builder.addCase(freeboardUpdateAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(freeboardCommentsAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(freeboardCommentsAsync.fulfilled, (state, { payload }) => {
      const { boardId, comments, isReload } = payload;
      const {
        content,
        empty,
        first,
        last,
        size,
        totalPages,
        pageable: { pageNumber },
      } = comments;

      const newComments: Types.Comments = {
        empty,
        first,
        last,
        size,
        totalPages,
        page: pageNumber,
        contents: [content],
      };

      if (state.coList) {
        if (isReload) {
          state.coList[boardId] = newComments;
        } else if (!state.coList[boardId]) {
          state.coList = {
            ...state.coList,
            [boardId]: newComments,
          };
        } else if (state.coList[boardId]) {
          state.coList[boardId].contents[pageNumber] = content;
          state.coList[boardId].page = pageNumber;
        }
      } else {
        state.coList = {
          [boardId]: newComments,
        };
      }

      state.status = "idle";
    });
    builder.addCase(freeboardCommentsAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
  },
});

export const contentSelector = (idx: number, boardId: number) => {
  return ({ freeBoardReduce: { list } }: RootState) => {
    if (list) return list.contents[idx].find(content => content.boardId === boardId);
    return undefined;
  };
};
export const getCommentContentsSelector =
  (boardId: number) =>
  ({ freeBoardReduce }: RootState) => {
    const { coList } = freeBoardReduce;
    if (coList !== null) return coList[boardId];
    return null;
  };
export const contentInfoSelector = ({ freeBoardReduce }: RootState) => freeBoardReduce.info;
export const freeBoardSelector = ({ freeBoardReduce }: RootState) => freeBoardReduce;
export const { setPage, setKeyWord, setContentInit } = freeBoardSlice.actions;
export default freeBoardSlice;
