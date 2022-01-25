import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  boardDelete,
  boardInsert,
  boardList,
  boardListByTitle,
  boardUpdate,
  commentDelet,
  commentInsert,
  commentList,
  commentUpdate,
  getBoard,
  subReplyDelete,
  subReplyInsert,
  subReplyUpdate,
} from "src/api/board/board";
import { errorHandler } from "src/api/http";
import { RootState } from "src/modules/store";
import { getFreeBoardPage } from "src/utils/localStorageUtil";
import * as Types from "./types";

const name = "freeboardReduce";

export const updateAsync = createAsyncThunk<void, Types.IUpdateRequest, Types.ThunkApi>(
  `${name}/updateAsync`,
  async (payload, { extra, rejectWithValue, dispatch, getState }) => {
    const { history } = extra;
    const { freeBoardReduce } = getState();
    const { list } = freeBoardReduce;
    try {
      const page = list?.page ?? getFreeBoardPage() ?? 0;
      const { data } = await boardUpdate<Types.IUpdateRequest>(payload);
      if (data.data.success === false) throw new Error("수정에 실패했습니다.");
      dispatch(listAsync(String(page)));
      history.replace("/community/freeboard");
      return undefined;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const insertAsync = createAsyncThunk<void, Types.IInsertRequest, Types.ThunkApi>(
  `${name}/insertAsync`,
  async (payload, { extra, rejectWithValue, dispatch, getState }) => {
    const { history } = extra;
    const { freeBoardReduce } = getState();
    const { list, keyWord } = freeBoardReduce;
    try {
      const page = list?.page ?? getFreeBoardPage() ?? 0;
      const { data } = await boardInsert<Types.IInsertRequest>(payload);
      if (data.data.success === false) throw new Error("등록에 실패했습니다.");

      dispatch(setContentInit());
      if (keyWord) {
        dispatch(listAsync("0"));
      } else {
        dispatch(listAsync(String(page)));
      }
      history.replace("/community/freeboard");
      return undefined;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const deleteAsync = createAsyncThunk<string, string, Types.ThunkApi>(
  `${name}/deleteAsync`,
  async (boardId, { extra, rejectWithValue, getState, dispatch }) => {
    const { freeBoardReduce } = getState();
    const { list, keyWord } = freeBoardReduce;
    const { history } = extra;
    try {
      if (list) {
        const { page, contents } = list;
        const { data } = await boardDelete(boardId);
        if (data.data.success === false) throw new Error("삭제에 실패했습니다.");

        if (keyWord) {
          if (contents[page].length === 1) {
            dispatch(listByTitleAsync({ keyWord, page: page - 1 }));
          } else {
            dispatch(listByTitleAsync({ keyWord, page }));
          }
        } else if (contents[page].length === 1) {
          dispatch(listAsync(String(page - 1)));
        } else {
          dispatch(listAsync(String(page)));
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

export const listByTitleAsync = createAsyncThunk<Types.List, Types.IListByTitleRequest, Types.ThunkApi>(
  `${name}/listByTitleAsync`,
  async ({ keyWord, page }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await boardListByTitle(page, keyWord);
      dispatch(setKeyWord(keyWord));
      return data.data;
    } catch (e) {
      const message = errorHandler(e);
      return rejectWithValue(message);
    }
  },
);

export const listAsync = createAsyncThunk<Types.List, string | number, Types.ThunkApi>(
  `${name}/listAsync`,
  async (page, { rejectWithValue }) => {
    try {
      const { data } = await boardList(page);
      return data.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const infoAsync = createAsyncThunk<Types.Content, string, Types.ThunkApi>(
  `${name}/infoAsync`,
  async (boardId, { rejectWithValue }) => {
    try {
      const { data } = await getBoard(boardId);
      return data.data;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const commentListAsync = createAsyncThunk<Types.Comments, Types.ICommentListRequest, Types.ThunkApi>(
  `${name}/commentListAsync`,
  async ({ boardId, page, isReload }, { rejectWithValue }) => {
    try {
      const { data } = await commentList(boardId, page);
      const comments = data.data;

      return {
        boardId: Number(boardId),
        comments,
        isReload,
      };
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const commentInsertAsync = createAsyncThunk<void, Types.InsertPayload, Types.ThunkApi>(
  `${name}/commentInsertAsync`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await commentInsert<Types.InsertPayload>(payload);
      const { boardId } = data.data;
      dispatch(commentListAsync({ boardId, page: 0, isReload: true }));
      return undefined;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);
export const commentDeleteAsync = createAsyncThunk<string, Types.DeletePayload, Types.ThunkApi>(
  `${name}/commentDeleteAsync`,
  async ({ replyId, boardId }, { rejectWithValue, dispatch }) => {
    try {
      await commentDelet(replyId);
      dispatch(commentListAsync({ boardId, page: 0, isReload: true }));
      return "삭제가 완료되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);
export const commentUpdateAsync = createAsyncThunk<string, Types.UpdatePayload, Types.ThunkApi>(
  `${name}/commentDeleteAsync`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await commentUpdate<Types.UpdatePayload>(payload);
      const { boardId } = data.data;
      dispatch(commentListAsync({ boardId, page: 0, isReload: true }));
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
      await subReplyInsert<Types.SubReplyInsertPayload>(payload);
      dispatch(commentListAsync({ boardId, page: 0, isReload: true }));
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
      await subReplyDelete(subReplyId);
      dispatch(commentListAsync({ boardId, page: 0, isReload: true }));
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
      await subReplyUpdate<Types.SubReplyUpdatePayload>(payload);
      dispatch(commentListAsync({ boardId, page: 0, isReload: true }));
      return "업데이트가 되었습니다.";
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

const initialState: Types.IFreeBoardReduce = {
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
    setPage: (state, action) => {
      const { list } = state;
      if (list) list.page = action.payload;
    },
    setKeyWord: (state, action) => {
      state.keyWord = action.payload;
    },
    setContentInit: state => {
      state.list = null;
      state.keyWord = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(insertAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(insertAsync.fulfilled, state => {
      state.status = "idle";
    });
    builder.addCase(insertAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(listByTitleAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(listByTitleAsync.fulfilled, (state, { payload }) => {
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
    builder.addCase(listByTitleAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(listAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(listAsync.fulfilled, (state, { payload }) => {
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
    builder.addCase(listAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(infoAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(infoAsync.fulfilled, (state, { payload }) => {
      state.status = "idle";
      state.info = payload;
    });
    builder.addCase(infoAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(deleteAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(deleteAsync.fulfilled, (state, { payload }) => {
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
    builder.addCase(deleteAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(updateAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(updateAsync.fulfilled, state => {
      state.status = "idle";
    });
    builder.addCase(updateAsync.rejected, (state, { payload }) => {
      state.status = "idle";
      state.error = payload ?? "클라이언트에서 문제가 발생했습니다.";
    });
    builder.addCase(commentListAsync.pending, state => {
      state.status = "loading";
    });
    builder.addCase(commentListAsync.fulfilled, (state, { payload }) => {
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

      const comment: Types.Comment = {
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
          state.coList[boardId] = comment;
        } else if (!state.coList[boardId]) {
          state.coList = {
            ...state.coList,
            [boardId]: comment,
          };
        } else if (state.coList[boardId]) {
          state.coList[boardId].contents[pageNumber] = content;
          state.coList[boardId].page = pageNumber;
        }
      } else {
        state.coList = {
          [boardId]: comment,
        };
      }

      state.status = "idle";
    });
    builder.addCase(commentListAsync.rejected, (state, { payload }) => {
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
