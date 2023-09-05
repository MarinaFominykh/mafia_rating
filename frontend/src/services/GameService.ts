import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import build from 'next/dist/build';
import { IGame } from '@/models/IGame';
import {INewGame} from '@/models/INewGame';
export const gameAPI = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Game'],
  endpoints: (build) => ({
    fetchAllGames: build.query<IGame[], any>({
      query: () => ({
        url: '/games',
      }),
      providesTags: (result) => ['Game'],
    }),
    createGame: build.mutation<INewGame, INewGame>({
      query: (game) => ({
        url: '/games',
        method: 'POST',
        body: game 
        
      }),
      invalidatesTags: ['Game'],
    }),
  }),
});
