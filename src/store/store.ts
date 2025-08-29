import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import CarsSlice from './Slices/CarsSlice';
import CreateCarSlice from './Slices/CreateCarSlice';
import CreateWinnerSlice from './Slices/CreateWinnerSlice';
import DeleteCarSlice from './Slices/DeleteCarSlice';
import DeleteWinnerSlice from './Slices/DeleteWinnerSlice';
import EngineSlice from './Slices/EngineControlSlice';
import GetCarSlice from './Slices/GetCarSlice';
import GetWinnersSlice from './Slices/GetWinnersSlice';
import UpdateCarSlice from './Slices/UpdateCarSlice';
import UpdateWinnerSlice from './Slices/UpdateWinnerSlice';

export const store = configureStore({
  reducer: {
    GetCarSlice: GetCarSlice,
    CreateCarSlice: CreateCarSlice,
    DeleteCarSlice: DeleteCarSlice,
    UpdateCarSlice: UpdateCarSlice,
    EngineSlice: EngineSlice,
    CreateWinnerSlice: CreateWinnerSlice,
    GetWinnersSlice: GetWinnersSlice,
    CarsSlice: CarsSlice,
    DeleteWinnerSlice: DeleteWinnerSlice,
    UpdateWinnerSlice: UpdateWinnerSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
