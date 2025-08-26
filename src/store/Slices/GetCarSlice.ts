import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReqToServer } from './../../api/api';
import { Car, CarState } from '@/types/GetCareType';


export const AsyncGetCarSlice = createAsyncThunk<Car[], void, { rejectValue: string }>(
    'AsyncGetCarSlice',
    async (_, { rejectWithValue }) => {
        try {
            const response = await ReqToServer.getCarsReq();
            return response;
        } catch (error: any) {
            return rejectWithValue('Failed to fetch cars.');
        }
    }
);



const initialState: CarState = {
    cars: [],
    loading: false,
    error: null,
};

const GetCarSlice = createSlice({
    name: 'GetCarSlice',
    initialState,
    reducers: {},
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