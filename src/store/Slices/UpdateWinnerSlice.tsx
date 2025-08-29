import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReqToServer } from '../../api/api';
import { Winner } from '../../types/WinnerType';

interface UpdateWinnerState {
  winner: Winner | null;
  loading: boolean;
  error: string | null;
}

const initialState: UpdateWinnerState = {
  winner: null,
  loading: false,
  error: null,
};

export const AsyncUpdateWinner = createAsyncThunk<
  Winner,
  { id: number; wins: number; time: number },
  { rejectValue: string }
>('updateWinner', async ({ id, wins, time }, { rejectWithValue }) => {
  try {
    const data = await ReqToServer.updateWinner(id, wins, time);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to create winner');
  }
});

const UpdateWinnerSlice = createSlice({
  name: 'updateWinner',
  initialState,
  reducers: {
    resetUpdateWinner(state) {
      state.winner = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncUpdateWinner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AsyncUpdateWinner.fulfilled,
        (state, action: PayloadAction<Winner>) => {
          state.loading = false;
          state.winner = action.payload;
        },
      )
      .addCase(AsyncUpdateWinner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetUpdateWinner } = UpdateWinnerSlice.actions;
export default UpdateWinnerSlice.reducer;
