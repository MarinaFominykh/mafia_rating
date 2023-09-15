import { createAction, createReducer, createSlice  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IGame } from '@/models/IGame';

export interface yearState {
  valueRaiting: string,
  valueGames: string,
  filterGamesRate: IGame[],
  filterGamesGame: IGame[],
}
const initialState: yearState ={
    valueRaiting: "За все время",
    valueGames: "За все время",
    filterGamesRate: [],
    filterGamesGame: [],

}
export const selectYearSlice = createSlice({
  name: 'selectYearRating',
  initialState,
  reducers: {
     yearRating: (state, action: PayloadAction<string>) => {
     state.valueRaiting = action.payload
    },
     getYear: (state, action: PayloadAction<string>) => {
     state.valueGames = action.payload
    },
    filterForRate: (state, action: PayloadAction<IGame[]>) => {
      state.filterGamesRate = action.payload

    },
        filterForGames: (state, action: PayloadAction<IGame[]>) => {
      state.filterGamesGame = action.payload

    },
  },
})

export const { yearRating, getYear, filterForRate, filterForGames } = selectYearSlice.actions

export default selectYearSlice.reducer
