import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateWinnerState, Winner } from '@/types/WinnerType';

import { ReqToServer } from '../../api/api';

const initialState: CreateWinnerState = {
  winner: null,
  loading: false,
  error: null,
  wins: 0,
};

export const AsyncCreateWinner = createAsyncThunk<
  Winner,
  { id: number; wins: number; time: number },
  { rejectValue: string }
>(
  'CreateWinnerSlice/AsyncCreateWinner',
  async ({ id, wins, time }, { rejectWithValue }) => {
    try {
      const data = await ReqToServer.createWinner(id, wins, time);
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create winner');
    }
  },
);

const CreateWinnerSlice = createSlice({
  name: 'CreateWinnerSlice',
  initialState,
  reducers: {
    resetWinner(state: CreateWinnerState) {
      state.winner = null;
      state.loading = false;
      state.error = null;
    },
    setWinner(state: CreateWinnerState, action: PayloadAction<number>) {
      state.wins = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncCreateWinner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AsyncCreateWinner.fulfilled,
        (state, action: PayloadAction<Winner>) => {
          state.loading = false;
          state.winner = action.payload;
        },
      )
      .addCase(AsyncCreateWinner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetWinner, setWinner } = CreateWinnerSlice.actions;
export default CreateWinnerSlice.reducer;
