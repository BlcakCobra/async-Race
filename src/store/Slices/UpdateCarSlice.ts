import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReqToServer } from './../../api/api';
import { Car } from './../../types/GetCareType';

interface UpdateCarPayload {
  id: number;
  name: string;
  color: string;
}

export const AsyncUpdateCarSlice = createAsyncThunk<
  Car, 
  UpdateCarPayload, 
  { rejectValue: string } 
>(
  'AsyncUpdateCarSlice',
  async ({ id, name, color }, { rejectWithValue }) => {
    try {
      const updatedCar = await ReqToServer.updateCarReq(name, color, id);
      return updatedCar;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update car.');
    }
  }
);

interface UpdateCarState {
  loading: boolean;
  error: string | null;
}

const initialState: UpdateCarState = {
  loading: false,
  error: null
};

const UpdateCarSlice = createSlice({
  name: 'UpdateCarSlice',
  initialState,
  reducers: {
    resetUpdateError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncUpdateCarSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AsyncUpdateCarSlice.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(AsyncUpdateCarSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  }
});

export const { resetUpdateError } = UpdateCarSlice.actions;
export default UpdateCarSlice.reducer;
