import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import build from 'next/dist/build';
import { IGame } from '@/models/IGame';
import { IUser } from '@/models/IUser';
export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], any>({
      query: () => ({
        url: '/players',
      }),
    }),
    // createGame: build.mutation<IGame, IGame>({
    //   query: (user) => ({
    //     url: '/players',
    //     method: 'POST',
    //     body: user 
        
    //   }),
    // }),
  }),
});
