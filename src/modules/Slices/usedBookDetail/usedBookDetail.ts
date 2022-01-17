import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import http from "src/api/http";
import { RootState } from "src/modules/store";
import { UsedBookDetailAsyncSuccess, UsedBookDetailFail, UsedBookDetailResponse } from "./types";

const initialState = {
  content: {} as UsedBookDetailResponse,
  category: {},
  status: "loading",
};
const name = "usedBookDetail";

// 중고 상품 상세 페이지
export const usedBookDetailAsync = createAsyncThunk<UsedBookDetailAsyncSuccess, number>(
  `${name}/bookAsync`,
  async (id, { rejectWithValue }) => {
    try {
      console.log("usedBookDetailAsync id : ", id);
      const response = await http.get(`/usedbook/${id}`);
      const { data } = response;
      const { success } = data;

      console.log("usedBookDetailAsync response : ", response);

      if (!success) {
        if (data.error.code === 200) {
          return console.log(data);
        }
      }
      return data;
    } catch (err) {
      const error = err as AxiosError<UsedBookDetailFail>;
      if (!error.response) throw err;
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
      .addCase(usedBookDetailAsync.pending, (state, action) => {
        console.log("usedBookDetailAsync action : ", action);
        state.status = "loading";
      })

      .addCase(usedBookDetailAsync.fulfilled, (state, { payload }) => {
        console.log("usedBookDetailAsync payload ", payload.data);
        state.status = "success";
        state.content = payload.data;
      })
      .addCase(usedBookDetailAsync.rejected, state => {
        state.status = "failed";
      });
  },
});

export const usedBookSelector = (state: RootState) => state.usedBookDetailReduce;
export default usedBookDetailSlice;
