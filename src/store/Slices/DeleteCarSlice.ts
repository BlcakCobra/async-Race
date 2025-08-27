import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ReqToServer } from "./../../api/api";
import { initialStateType } from "./../../types/CreateCarType"; 

export const AsyncDeleteCarSlice = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>(
    "DeleteCarSlice",
    async (id, { rejectWithValue }) => {
        if (!id) {
            return rejectWithValue("id is required!");
        }
        try {
            await ReqToServer.deleteCarReq(id);
            return id; 
        } catch (error: any) {
            return rejectWithValue("Failed to delete car.");
        }
    }
);

const initialState: initialStateType = {
    car: {
        name: "",
        color: "",
    },
    loading: false,
    error: null,
};

const DeleteCarSlice = createSlice({
    name: "DeleteCarSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AsyncDeleteCarSlice.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AsyncDeleteCarSlice.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(AsyncDeleteCarSlice.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            });
    },
});

export default DeleteCarSlice.reducer;
