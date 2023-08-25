import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import build from 'next/dist/build'
import { IGame } from '@/models/IGame'
export const gameAPI = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    endpoints: (build) => ({
        fetchAllGames: build.query<IGame[], any>({
            query: () => ({
                url: '/games'
                
            })
        })

    })
})
