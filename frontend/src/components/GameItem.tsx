import { IGame } from '@/models/IGame';
import React, { FC } from 'react';
import styles from '@/styles/GameItem.module.scss';
import moment from 'moment';
import { RED_RESULT, BLACK_RESULT } from '@/utils/constans';
interface GameItemProps {
  game: IGame;
  openDetail: (game: IGame) => void;
}
const GameItem: FC<GameItemProps> = ({ game, openDetail }) => {
  function handleDetail() {
   openDetail(game);
  }
  return (
    <article className={styles.game}>
      <div
        className={`${styles.image} ${
          game.result === RED_RESULT
            ? styles.win_red
            : game.result === BLACK_RESULT
            ? styles.win_black
            : styles.win_null
        }`}
      ></div>
      <div className={styles.info}>
        <h2 className={styles.title}>{game.title}</h2>
        <div className={styles.container}>
          <div className={styles.info_container}>
            <div className={`${styles.icon} ${styles.icon_gm}`}></div>
            <div>
              <p className={`${styles.text} ${styles.text_data}`}>
                {game.gameMaster.name}
              </p>
              <p className={`${styles.text} ${styles.text_description}`}>
                Ведущий
              </p>
            </div>
          </div>
          <div className={styles.info_container}>
            <div className={`${styles.icon} ${styles.icon_calendar}`}></div>
            <div>
              <p className={`${styles.text} ${styles.text_data}`}>
                {moment(game.date).format('DD.MM.YYYY')}
              </p>
              <p className={`${styles.text} ${styles.text_description}`}>
                Дата игры
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={handleDetail}
          type='button'
          className={styles.more_btn}
        >
          <div className={`${styles.icon} ${styles.icon_play}`}></div>
          <p className={styles.text_btn}>Подробнее об игре</p>
        </button>
      </div>
    </article>
  );
};

export default GameItem;
