import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GetWinnersState, Winner } from '@/types/WinnerType';

import { ReqToServer } from '../../api/api';

const initialState: GetWinnersState = {
  winners: [],
  loading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
};

export const AsyncGetWinners = createAsyncThunk<
  { data: Winner[]; totalCount: number },
  {
    page?: number;
    limit?: number;
    sort?: 'id' | 'wins' | 'time';
    order?: 'ASC' | 'DESC';
  },
  { rejectValue: string }
>(
  'AsyncGetWinners',
  async (
    { page = 1, limit = 10, sort = 'wins', order = 'DESC' },
    { rejectWithValue },
  ) => {
    try {
      const response = await ReqToServer.getWinners(page, limit, sort, order);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Failed to create winner');
    }
  },
);

const GetWinnersSlice = createSlice({
  name: 'GetWinnersSlice',
  initialState,
  reducers: {
    resetWinners(state) {
      state.winners = [];
      state.loading = false;
      state.error = null;
      state.totalCount = 0;
    },
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncGetWinners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AsyncGetWinners.fulfilled,
        (
          state,
          action: PayloadAction<{ data: Winner[]; totalCount: number }>,
        ) => {
          state.loading = false;
          state.winners = action.payload.data;
          state.totalCount = action.payload.totalCount;
        },
      )
      .addCase(AsyncGetWinners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetWinners, setCurrentPage } = GetWinnersSlice.actions;
export default GetWinnersSlice.reducer;
