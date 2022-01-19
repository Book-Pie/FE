import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { boardDelete, boardInsert, boardList, getBoard } from "src/api/board/board";
import { errorHandler } from "src/api/http";
import { RootState } from "src/modules/store";
import { InsertThunkApi, IInsertRequest, IFreeBoardReduce, List, Content, Contents } from "./type";

const name = "freeboardReduce";

export const insertAsync = createAsyncThunk<void, IInsertRequest, InsertThunkApi>(
  `${name}/insertAsync`,
  async (payload, { extra, rejectWithValue, dispatch, getState }) => {
    const { history } = extra;
    const { freeBoardReduce } = getState();
    const { list } = freeBoardReduce;
    try {
      if (list) {
        const { page } = list;
        const { data } = await boardInsert<IInsertRequest>(payload);
        console.log(data);

        if (data.data.success === false) throw new Error("등록에 실패했습니다.");
        dispatch(listAsync(String(page)));
        history.replace("/community/freeboard");
        return data.data;
      }
      return null;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const deleteAsync = createAsyncThunk<string, string, InsertThunkApi>(
  `${name}/deleteAsync`,
  async (boardId, { extra, rejectWithValue, getState, dispatch }) => {
    const { freeBoardReduce } = getState();
    const { list } = freeBoardReduce;
    const { history } = extra;
    try {
      if (list) {
        const { page } = list;
        const { data } = await boardDelete(boardId);
        if (data.data.success === false) throw new Error("삭제에 실패했습니다.");
        dispatch(listAsync(String(page)));
        history.replace("/community/freeboard");
      }
      return boardId;
    } catch (error) {
      const message = errorHandler(error);
      return rejectWithValue(message);
    }
  },
);

export const listAsync = createAsyncThunk<List, string, InsertThunkApi>(
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

export const infoAsync = createAsyncThunk<Content, string, InsertThunkApi>(
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

const freeBoardSlice = createSlice({
  name,
  initialState: {
    status: "idle",
    error: null,
    list: null,
    info: null,
  } as IFreeBoardReduce,
  reducers: {
    incresePage: (state, action) => {
      const { list } = state;
      if (list) {
        list.page = action.payload;
      }
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

      state.status = "idle";

      if (state.list !== null) {
        state.list.empty = empty;
        state.list.first = first;
        state.list.last = last;
        state.list.totalPages = totalPages;
        state.list.page = pageNumber;
        state.list.contents = {
          ...state.list.contents,
          [pageNumber]: content,
        };
      }

      if (state.list === null) {
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
        const array: Content[] = [];
        const key = Object.keys(contents)[0];

        Object.values(contents).forEach(value => array.push(...value));
        let index = Number(key);

        const newContents = array
          .filter(content => content.boardId !== Number(payload))
          .reduce((acc: Contents, cur: Content, idx) => {
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
  },
});

export const freeBoardContentSelector = (idx: number, boardId: number) => {
  return ({ freeBoardReduce: { list } }: RootState) => {
    if (list) return list.contents[idx].find(content => content.boardId === boardId);
    return undefined;
  };
};
export const freeBoardInfoSelector = ({ freeBoardReduce }: RootState) => freeBoardReduce.info;
export const freeBoardSelector = ({ freeBoardReduce }: RootState) => freeBoardReduce;
export const { incresePage } = freeBoardSlice.actions;
export default freeBoardSlice;
