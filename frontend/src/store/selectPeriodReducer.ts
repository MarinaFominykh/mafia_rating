import { createAction, createReducer, createSlice  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface yearState {
  valueRaiting: string,
  valueGames: string
}
const initialState: yearState ={
    valueRaiting: "За все время",
    valueGames: "За все время",
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
  },
})

export const { yearRating, getYear } = selectYearSlice.actions

export default selectYearSlice.reducer
