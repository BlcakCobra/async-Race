import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReqToServer } from './../../api/api';
import { Car } from './../../types/GetCareType';
import { initialStateType } from './../../types/CreateCarType';

export const AsyncCreateCarSlice = createAsyncThunk<Car, { name: string, color: string }, { rejectValue: string }>(
    'CreateCarSlice',
    async (_args, { rejectWithValue }) => {
        const { name, color } = _args;
        if (!name || name.length < 3) {
            return rejectWithValue("Name must be at least 3 characters long");
        }
        if (!color) {
            return rejectWithValue("Color can't be empty");
        }
        try {
            const response = await ReqToServer.createCarReq(name, color);
            return response;  
        } catch (error: any) {
            return rejectWithValue('Failed to create car.');
        }
    }
);

const initialState: initialStateType = {
    car:{
        name:"",
        color:""
    },  
    loading: false,
    error: null,
    
};

const CreateCarSlice = createSlice({
    name: 'GetCarSlice',
    initialState,
    reducers: {
        setCarColor(state, action) {
            state.car.color = action.payload; 
        },
        setCarName(state, action) {
            state.car.name = action.payload; 
        },
        setError(state,action){
            state.error = action.payload
        },
        ResetAreas(state){
            if(state.car.color || state.car.name ){
                state.car = { ...initialState.car }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(AsyncCreateCarSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AsyncCreateCarSlice.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(AsyncCreateCarSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'An error occurred';
            });
    },
});

export default CreateCarSlice.reducer;

export const {setCarName,setCarColor,setError,ResetAreas} = CreateCarSlice.actions