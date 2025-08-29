import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReqToServer } from './../../api/api';
import { initialStateType } from './../../types/CreateCarType';
import { Car } from './../../types/GetCareType';

export const AsyncCreateCarSlice = createAsyncThunk<
  Car,
  { name: string; color: string },
  { rejectValue: string }
>('CreateCarSlice', async (_args, { rejectWithValue }) => {
  const { name, color } = _args;
  if (!name || name.length < 3) {
    return rejectWithValue('Name must be at least 3 characters long');
  }
  if (!color) {
    return rejectWithValue("Color can't be empty");
  }
  try {
    const response = await ReqToServer.createCarReq(name, color);
    return response;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return rejectWithValue('Failed to create car.');
  }
});

const initialState: initialStateType = {
  car: {
    name: '',
    color: '',
  },
  loading: false,
  error: null,
};

const CreateCarSlice = createSlice({
  name: 'GetCarSlice',
  initialState,
  reducers: {
    setCarColor(state, action: PayloadAction<string>) {
      state.car.color = action.payload;
    },
    setCarName(state, action: PayloadAction<string>) {
      state.car.name = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    ResetAreas(state): void {
      if (state.car.color || state.car.name) {
        state.car = { ...initialState.car };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncCreateCarSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AsyncCreateCarSlice.fulfilled, (state, _action) => {
        state.loading = false;
      })
      .addCase(AsyncCreateCarSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      });
  },
});

export default CreateCarSlice.reducer;

export const { setCarName, setCarColor, setError, ResetAreas } =
  CreateCarSlice.actions;
