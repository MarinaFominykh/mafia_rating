import React, { useState } from 'react';
import GamesList from '@/components/GamesList';
import GamesMain from '@/components/GamesMain';
import GameDetail from '@/components/GameDetail';
import { gameAPI } from '@/services/GameService';
import { openPopup, closePopup } from '@/utils/functions';
import { IGame, Player } from '@/models/IGame';

const Games = () => {
  const {
    data: games,
    error,
    isLoading,
    refetch,
  } = gameAPI.useFetchAllGamesQuery('');
  const [currentGame, setCurrentGame] = useState({});
  const [isGameDetailOpen, setisGameDetailOpen] = useState(false);

  function handleDetailClick(game: IGame) {
    setisGameDetailOpen(true);
    setCurrentGame(game);
  }
  
  return (
    <>
      <GamesMain openDetail={handleDetailClick} />
      <GameDetail
        isOpen={isGameDetailOpen}
        onClose={() => closePopup(setisGameDetailOpen)}
        game={currentGame}
      />
    </>
  );
};

export default Games;
