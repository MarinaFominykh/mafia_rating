import React from 'react';
import { gameAPI } from '../services/GameService';
import GameItem from './GameItem';
import { IGame } from '@/models/IGame';
const GamesList = () => {
  const {
    data: games,
    error,
    isLoading,
    refetch,
  } = gameAPI.useFetchAllGamesQuery('');

  const [createGame, {}] = gameAPI.useCreateGameMutation();
  // const handlerCreate = async () => {
  //   const title = prompt();
  //   await createGame({
  //     title: 'Мафия 51. Жара',
  //     gameMaster: '64e2fde5da28496ed82cc291',
  //     date: '2020-04-21T00:00:00.000Z',
  //     result: 'Победа города',
  //     players: [
  //       {
  //         player: '64e2fde5da28496ed82cc2a5',
  //         role: 'шериф',
  //         bestPlayer: true,
  //       },
  //       {
  //         player: '64e2fde5da28496ed82cc299',
  //         role: 'дон',
  //       },
  //       {
  //         player: '64e2fde5da28496ed82cc288',
  //         role: 'мирный',
  //       },
  //       {
  //         player: '64e2fde5da28496ed82cc293',
  //         role: 'мирный',
  //       },
  //       {
  //         player: '64e2fde5da28496ed82cc288',
  //         role: 'мирный',
  //       },

  //       {
  //         player: '64e2fde5da28496ed82cc28a',
  //         role: 'мирный',
  //       },

  //       {
  //         player: '64e2fde5da28496ed82cc2a8',
  //         role: 'мирный',
  //       },

  //       {
  //         player: '64e2fde5da28496ed82cc278',
  //         role: 'мирный',
  //       },
  //       {
  //         player: '64e2fde5da28496ed82cc296',
  //         role: 'мафия',
  //       },
  //       {
  //         player: '64e2fde5da28496ed82cc284',
  //         role: 'мафия',
  //       },
  //     ],
  //   } );
  // };
  return (
    <div>
      <button onClick={() => refetch()}>refetch</button>
      {/* <button onClick={handlerCreate}>Add new game</button> */}
      {isLoading && <span>Loading...</span>}
      {error && <span>Произошла ошибка при загрузке</span>}
      {games?.map((game) => (
        <GameItem key={game._id} game={game} />
      ))}
    </div>
  );
};

export default GamesList;
