import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Player } from '@/models/IGame';
interface AddGameFormState {
  
    title: string;
    gameMaster: string;
    result: string;
    date: string;
    players: Player[];
  
}

const initialState: AddGameFormState = {
  
    title: '',
    gameMaster: '',
    result: '',
    date: '',
    players: [],
  
};

export const gameFormSlice = createSlice({
  name: 'gameForm',
  initialState,
  reducers: {
    createGame(state, action: PayloadAction<AddGameFormState>) {
      state.title = action.payload.title;
      state.date = action.payload.date;
    },
    
  },
});

export default gameFormSlice.reducer;
