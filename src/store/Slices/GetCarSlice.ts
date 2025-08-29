import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ReqToServer } from './../../api/api';
import { Car, initialStateType } from './../../types/GetCareType';

export const AsyncGetCarSlice = createAsyncThunk<
  Car[],
  void,
  { rejectValue: string }
>('AsyncGetCarSlice', async (_, { rejectWithValue }) => {
  try {
    const response = await ReqToServer.getCarsReq();
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('Failed to create winner');
  }
});

const initialState: initialStateType = {
  cars: [],
  loading: false,
  error: null,
  currentPage: 1,
  car: null,
};

const GetCarSlice = createSlice({
  name: 'GetCarSlice',
  initialState,
  reducers: {
    setCurrentPage(state, action: { payload: number }) {
      state.currentPage = action.payload;
    },
    setCar(state, action) {
      if (state.car) {
        state.car.color = action.payload;
        state.car.id = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncGetCarSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AsyncGetCarSlice.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(AsyncGetCarSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default GetCarSlice.reducer;
export const { setCurrentPage, setCar } = GetCarSlice.actions;
