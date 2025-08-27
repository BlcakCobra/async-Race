import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import GetCarSlice from './Slices/GetCarSlice';
import CreateCarSlice from './Slices/CreateCarSlice';
import DeleteCarSlice from './Slices/DeleteCarSlice';


export const store = configureStore({
  reducer: {
    GetCarSlice: GetCarSlice,
    CreateCarSlice: CreateCarSlice,
    DeleteCarSlice: DeleteCarSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 