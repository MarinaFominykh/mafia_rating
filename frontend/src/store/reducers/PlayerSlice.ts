import { IUser } from '@/models/IUser';
import { IDataUser } from '@/models/IDataUser';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface PlayerState {
  players: IDataUser[];
}

const initialState: PlayerState = {
  players: [],
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    usersTransform(state, action: PayloadAction<IDataUser[]>) {
      state.players = action.payload;
    },
  },
});

export default playerSlice.reducer;
