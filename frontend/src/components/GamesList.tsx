import React from 'react';
import styles from '@/styles/GamesList.module.scss';
import PacmanLoader from 'react-spinners/PacmanLoader';
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

  const [createGame, { error: createError }] = gameAPI.useCreateGameMutation();
  
  return (
    <>
      <div>
        {/* <button onClick={() => refetch()}>refetch</button> */}
        {/* <button onClick={handlerCreate}>Add new game</button> */}
        {isLoading && (
          <article className={styles.loader}>
            {' '}
            <PacmanLoader color='#118dff' size={50} />
          </article>
        )}
        {error && <span>Произошла ошибка при загрузке...</span>}
      </div>
      <section className={styles.games}>
        {games?.map((game) => (
          <GameItem key={game._id} game={game} />
        ))}
      </section>
    </>
  );
};

export default GamesList;
