import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReqToServer } from '../../api/api';

interface DeleteWinnerState {
  loading: boolean;
  error: string | null;
  deletedWinnerId: number | null;
}

const initialState: DeleteWinnerState = {
  loading: false,
  error: null,
  deletedWinnerId: null,
};

export const AsyncDeleteWinner = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>('AsyncDeleteWinner', async (id, { rejectWithValue }) => {
  try {
    await ReqToServer.deleteWinner(id);
    return id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to delete winner');
  }
});

const DeleteWinnerSlice = createSlice({
  name: 'DeleteWinnerSlice',
  initialState,
  reducers: {
    resetDeleteWinner(state) {
      state.loading = false;
      state.error = null;
      state.deletedWinnerId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncDeleteWinner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AsyncDeleteWinner.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.deletedWinnerId = action.payload;
        },
      )
      .addCase(AsyncDeleteWinner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetDeleteWinner } = DeleteWinnerSlice.actions;
export default DeleteWinnerSlice.reducer;
