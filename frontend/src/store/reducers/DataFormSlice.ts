import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { INewGame } from '@/models/INewGame';
const initialState: INewGame = {
  title: '',
  gameMaster: '',
  date: '',
  result: '',
  players: [],
};

export const gameFormSlice = createSlice({
  name: 'gameForm',
  initialState,
  reducers: {
    getData(state, action: PayloadAction<INewGame>) {
      state.title = action.payload.title;
      state.date = action.payload.date;
      state.gameMaster= action.payload.gameMaster;
      state.result = action.payload.result;
      state.players = action.payload.players;
    },
  },
});

export const { getData } = gameFormSlice.actions
export default gameFormSlice.reducer;
