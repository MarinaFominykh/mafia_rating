import { createSlice  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface playerState {
  id: string,
  name: string
}

export interface playersState {
  players: playerState[]
}
const initialState: playersState ={
    players: []
}
export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
     getPlayers: (state, action:  PayloadAction<playerState[]>) => {
     state.players = action.payload
    },
  },
})

export const { getPlayers } = playersSlice.actions

export default playersSlice.reducer
