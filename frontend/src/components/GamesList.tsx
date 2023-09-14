import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import styles from '@/styles/GamesList.module.scss';
import Image from 'next/image';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { gameAPI } from '../services/GameService';
import GameItem from './GameItem';
import { IGame } from '@/models/IGame';
import { filterGames } from '@/utils/functions';
const GamesList = () => {
  const {
    data: games,
    error,
    isLoading,
    refetch,
  } = gameAPI.useFetchAllGamesQuery('');

  const [createGame, { error: createError }] = gameAPI.useCreateGameMutation();
  const period = useSelector(
    (state: RootState) => state.selectYearReducer.valueGames
  );
  const [filteredGames, setFilteredGames] = useState(games);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  useEffect(() => {
    setFilteredGames(filterGames(games, period));
  }, [period]);

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
        {filteredGames?.map((game) => (
          <GameItem key={game._id} game={game} />
        ))}
      
      </section>
        {filteredGames && filteredGames.length === 0 && (
          <article className={styles.no_games}>
            <div className={styles.no_games_wrapper}>
              <Image
                src='/images/no_games.png'
                alt='Аватар игрока'
                width='0'
                height='0'
                sizes='100vw'
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            <p className={styles.no_games_title}>
              Мы не смогли найти игры за выбранный период
            </p>
            <p className={styles.no_games_text}>
              Создайте новую игру или подождите пока другой пользователь сделает
              это
            </p>
            <button
              // onClick={onClickAddMatch}
              type='button'
              className={`button ${styles.no_games_button}`}
            >
              Создать игру &#43;
            </button>
          </article>
        )}
    </>
  );
};

export default GamesList;
