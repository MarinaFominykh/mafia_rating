import React from 'react';
import { gameAPI } from '../services/GameService';

const GamesList = () => {
  const { data: games } = gameAPI.useFetchAllGamesQuery('');
  return (
    <div>
      {games?.map((game) => (
        <div>{game.title}</div>
      ))}
    </div>
  );
};

export default GamesList;
