import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import build from 'next/dist/build';
import { IGame } from '@/models/IGame';
import { IUser } from '@/models/IUser';
export const userAPI = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    fetchAllUsers: build.query<IUser[], any>({
      query: () => ({
        url: '/players',
      }),
      providesTags: (result) => ['User'],
    }),
    createUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: '/players',
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['User'],
    }),
    editUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/players/${user._id}`,
        method: 'PATCH',
        body:{name: user.name},
      }),
      invalidatesTags: ['User'],
    }),

    deleteUser: build.mutation<IUser, IUser>({
      query: (user) => ({
        url: `/players/${user._id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
