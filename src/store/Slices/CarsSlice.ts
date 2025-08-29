import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Winner } from '@/types/WinnerType';

import { ReqToServer } from '../../api/api';

interface CarsState {
  cars: Record<number, Winner>;
  loading: boolean;
  error: string | null;
}

const initialState: CarsState = {
  cars: {},
  loading: false,
  error: null,
};

export const AsyncGetCarById = createAsyncThunk<
  Winner,
  number,
  { rejectValue: string }
>('AsyncGetCarById', async (id, { rejectWithValue }) => {
  try {
    const response = await ReqToServer.getWinner(id);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to fetch car');
  }
});

const CarsSlice = createSlice({
  name: 'CarsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AsyncGetCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AsyncGetCarById.fulfilled,
        (state, action: PayloadAction<Winner>) => {
          state.loading = false;
          state.cars[action.payload.id] = action.payload;
        },
      )
      .addCase(AsyncGetCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default CarsSlice.reducer;
