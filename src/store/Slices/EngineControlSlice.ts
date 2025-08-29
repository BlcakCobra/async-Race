import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ReqToServer } from '../../api/api';
import { EngineState } from '../../types/EngineType';

const initialState: EngineState = {
  loading: false,
  error: null,
  engineData: {},
};

export const AsyncEngineControl = createAsyncThunk<
  { id: number; velocity: number; distance: number; time?: number },
  { id: number; status: 'started' | 'stopped' },
  { rejectValue: string }
>('AsyncEngineControl', async (args, { rejectWithValue }) => {
  const { id, status } = args;
  try {
    const data = await ReqToServer.engineControlReq(id, status);
    return { id, ...data };
  } catch (error: unknown) {
    if (error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue('Failed to control engine');
  }
});

const EngineSlice = createSlice({
  name: 'EngineSlice',
  initialState,
  reducers: {
    resetEngineData(state) {
      Object.keys(state.engineData).forEach((id) => {
        state.engineData[+id] = {
          velocity: 0,
          distance: 0,
          start: null,
          end: null,
          time: null,
          position: 0,
        };
      });
      state.loading = false;
      state.error = null;
    },
    setStart(state, action: PayloadAction<{ id: number; time: number }>) {
      const { id, time } = action.payload;
      if (!state.engineData[id])
        state.engineData[id] = {
          velocity: 0,
          distance: 0,
          position: 0,
          start: null,
          end: null,
          time: null,
        };
      state.engineData[id].start = time;
    },
    setEnd(state, action: PayloadAction<{ id: number; time: number }>) {
      const { id, time } = action.payload;
      if (!state.engineData[id])
        state.engineData[id] = {
          velocity: 0,
          distance: 0,
          position: 0,
          start: null,
          end: null,
          time: null,
        };
      state.engineData[id].end = time;
      if (state.engineData[id].start != null) {
        state.engineData[id].time = time - state.engineData[id].start;
      }
    },
    setTime(state, action: PayloadAction<{ id: number; time: number }>) {
      const { id, time } = action.payload;
      if (!state.engineData[id])
        state.engineData[id] = {
          velocity: 0,
          distance: 0,
          position: 0,
          start: null,
          end: null,
          time: null,
        };
      state.engineData[id].time = time;
    },
    setPosition(
      state,
      action: PayloadAction<{ id: number; position: number }>,
    ) {
      const { id, position } = action.payload;
      if (!state.engineData[id])
        state.engineData[id] = {
          velocity: 0,
          distance: 0,
          position: 0,
          start: null,
          end: null,
          time: null,
        };
      state.engineData[id].position = position;
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
        (
          state,
          action: PayloadAction<{
            id: number;
            velocity: number;
            distance: number;
            time?: number;
          }>,
        ) => {
          state.loading = false;
          const { id, velocity, distance, time } = action.payload;

          if (!state.engineData[id])
            state.engineData[id] = {
              velocity: 0,
              distance: 0,
              position: 0,
              start: null,
              end: null,
              time: null,
            };

          if (velocity === 0) {
            state.engineData[id].velocity = 0;
            state.engineData[id].position = 0;
            return;
          }

          state.engineData[id].velocity = velocity;
          state.engineData[id].distance = distance;
          if (time != null) state.engineData[id].time = time;
        },
      )
      .addCase(AsyncEngineControl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetEngineData, setStart, setEnd, setTime, setPosition } =
  EngineSlice.actions;
export default EngineSlice.reducer;
