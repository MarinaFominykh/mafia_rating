import {combineReducers, configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import selectYearRatingReducer from './selectPeriodReducer';
import playersReducer from './playersReducer';
import userReducer from './reducers/UserSlice';
import playerReducer from './reducers/PlayerSlice';
import GameFormReducer from './reducers/GameFormSlice';
import { gameAPI } from '@/services/GameService';
import {userAPI} from '@/services/UserService';
export const rootReducer = combineReducers({

   // userReducer,
   playerReducer,
   GameFormReducer,
   [gameAPI.reducerPath]: gameAPI.reducer,
   [userAPI.reducerPath]: userAPI.reducer,
 });

 export const setupStore = () => {
  return configureStore ({
   reducer: rootReducer, 
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameAPI.middleware, userAPI.middleware),
 })}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
