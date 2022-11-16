import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchCount } from "./counterAPI";

export interface CounterState {
  value: number;
  status: "idle" | "loading" | "failed";
}

const initialState: CounterState = {
  value: 0,
  status: "idle",
};

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const counterSlice = createSlice({
  // sliceの名前
  name: "counter",

  // 第二引数にinitialStateを持たせる
  initialState,

  // reducersに具体的なアクションを記載する
  // ここのアクションはdispatchから呼び出されることによって処理が行われる
  reducers: {
    increment: (state) => {
      // 今のstateに+1する
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },
    // ユーザーが指定した数字分足し算引き算できるようにするやつ
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(incrementAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

// ここでCounter.tsxで使えるようにexportしている
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// reactコンポーネントからstoreの中のstateを見るようにするための関数
// stateの中のカウンターに入っている現在の数字を返してくれる
// RootState は各スライスのデータタイプをオブジェクト状に一纏めにしたもの
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default counterSlice.reducer;
