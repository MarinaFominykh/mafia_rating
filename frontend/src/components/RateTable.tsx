import React, {useEffect} from 'react';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IDataUser } from '@/models/IDataUser';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { userAPI } from '@/services/UserService';
import { gameAPI } from '../services/GameService';
import { playerSlice } from '@/store/reducers/PlayerSlice';
import {
  countGames,
  blackWin,
  redWin,
  totalWin,
  bestPlayer,
  modKill,
  rating,
} from '../utils/functions';
// interface DataType {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

const columns: ColumnsType<IDataUser> = [
  {
    title: 'Имя',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
    {
    title: 'Количество игр',
    dataIndex: 'games',
    key: 'games',
  },
  {
    title: 'Побед',
    dataIndex: 'wins',
    key: 'wins',
  },

  {
    title: 'Лучший игрок',
    dataIndex: 'best',
    key: 'best',
  },
  {
    title: 'Рейтинг',
    dataIndex: 'rating',
    key: 'rating',
  },



];


const RateTable: React.FC = () => {
    let playerArray;
    const dispatch = useAppDispatch();
  const {
    data: users,
    error,
    isLoading,
    isSuccess,
  } = userAPI.useFetchAllUsersQuery('');
  const { data: games } = gameAPI.useFetchAllGamesQuery('');

const { players } = useAppSelector((state) => state.playerReducer);
useEffect(() => {
    playerArray = users?.map((user) => {
      return {
        id: user._id,
        name: user.name,
        wins: totalWin(games, user),
        games: countGames(games, user),
        best: bestPlayer(games, user),
        rating: rating(games, user),
        // blackVictory: blackWin(games, user),
        // redVictory: redWin(games, user),
        // modKill: modKill(games, user),
      };
    }).sort(function (a, b) {
      return a.rating < b.rating ? 1 : -1;
    });
    if (playerArray) {
      dispatch(playerSlice.actions.usersTransform(playerArray));
    }
  }, [users, games]);
  return <Table columns={columns} dataSource={players} />
};

export default RateTable;
