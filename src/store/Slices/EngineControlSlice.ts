import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReqToServer } from '../../api/api';
import { EngineState } from './../../types/EngineType';

const initialState: EngineState = {
  loading: false,
  error: null,
  engineData: {},
};

export const AsyncEngineControl = createAsyncThunk<
  {
    time: number; id: number; velocity: number; distance: number 
},
  { id: number; status: 'started' | 'stopped' },
  { rejectValue: string }
>(
  'AsyncEngineControl',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const data = await ReqToServer.engineControlReq(id, status);
      return { id, ...data };
    } catch (error: any) {
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

const EngineSlice = createSlice({
  name: 'EngineSlice',
  initialState,
  reducers: {
    resetEngineData(state) {
      state.engineData = {};
      state.loading = false;
      state.error = null;
    },
    setStart(state, action: PayloadAction<{ id: number; time: number }>) {
      const { id, time } = action.payload;
      if (!state.engineData[id] ) state.engineData[id] = {} as any;
      state.engineData[id].start = time;
    },
    setEnd(state, action: PayloadAction<{ id: number; time: number }>) {
      const { id, time } = action.payload;
      if (!state.engineData[id]) state.engineData[id] = {} as any;
      state.engineData[id].end = time;
      if (state.engineData[id].start != null) {
        state.engineData[id].time = time - state.engineData[id].start;
      }
    },
    setTime(state, action: PayloadAction<{ id: number; time: number }>) {
      const { id, time } = action.payload;
      if (!state.engineData[id]) state.engineData[id] = {} as any;
      state.engineData[id].time = time;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AsyncEngineControl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        AsyncEngineControl.fulfilled,
        (state, action: PayloadAction<{ id: number; velocity: number; distance: number }>) => {
          state.loading = false;
          if (!state.engineData[action.payload.id]) state.engineData[action.payload.id] = {} as any;
          state.engineData[action.payload.id].velocity = action.payload.velocity;
          state.engineData[action.payload.id].distance = action.payload.distance;
        }
      )
      .addCase(AsyncEngineControl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetEngineData, setStart, setEnd, setTime } = EngineSlice.actions;
export default EngineSlice.reducer;
