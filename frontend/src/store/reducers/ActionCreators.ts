import axios from 'axios';
import { AppDispatch } from '../index';
import { IUser } from '@/models/IUser';
import { userSlice } from './UserSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.usersFetching())
//     const resoponse = await axios.get<IUser[]>('http://localhost:3001/players');
//   dispatch(userSlice.actions.usersFetchingSucces(resoponse.data))
// } catch (e: any) {
//     dispatch(userSlice.actions.usersFetchingError(e.message))
// }
// };

// Redux-toolkit
export const fetchUsers = createAsyncThunk(
  'user/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<IUser[]>(
        'http://localhost:3001/players'
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
    }
  }
);
