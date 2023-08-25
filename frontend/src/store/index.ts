import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import selectYearRatingReducer from './selectPeriodReducer';
import playersReducer from './playersReducer';
import userReducer from './reducers/UserSlice';
import { gameAPI } from '@/services/GameService';
export const rootReducer = combineReducers({

   userReducer,
   [gameAPI.reducerPath]: gameAPI.reducer
 });

 export const setupStore = () => {
  return configureStore ({
   reducer: rootReducer, 
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameAPI.middleware),
 })}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']