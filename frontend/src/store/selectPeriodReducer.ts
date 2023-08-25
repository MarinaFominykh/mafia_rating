import { createAction, createReducer, createSlice  } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface yearRatingState {
  value: string
}
const initialState: yearRatingState ={
    value: "За все время"
}
export const selectYearRatingSlice = createSlice({
  name: 'selectYearRating',
  initialState,
  reducers: {
     yearRating: (state, action: PayloadAction<string>) => {
     state.value = action.payload
    },
  },
})

export const { yearRating } = selectYearRatingSlice.actions

export default selectYearRatingSlice.reducer
