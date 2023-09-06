import { IGame } from '@/models/IGame';
import React, { FC } from 'react';
import styles from '@/styles/GameItem.module.scss';
import gameMasterIcon from '../images/icons/gamemaster.svg';
import calendarIcon from '../images/icons/calendar.svg';
import play from '../images/icons/fluent_play-settings-20-regular.svg';
import { RED_RESULT, BLACK_RESULT, EQUALITY_RESULT } from '@/utils/constans';
interface GameItemProps {
  game: IGame;
}
const GameItem: FC<GameItemProps> = ({ game }) => {
  const imageClass = () => {
    if (game.result === 'Победа города') {
      return 'image win_red';
    } else if (game.result === 'Победа мафии') {
      return 'image win_black';
    }
    return 'image win_null';
  };
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
            <img
              src={gameMasterIcon}
              className={styles.icon}
              alt='Ведущий'
            ></img>
            <div className='match__text-container'>
              <p className='match__text match__text-data'>
                {game.gameMaster.name}
              </p>
              <p className='match__text match__text-description'>Ведущий</p>
            </div>
          </div>
          <div className='match__info-container'>
            <img
              src={calendarIcon}
              className='match__icon'
              alt='Дата игры'
            ></img>
            <div className='match__text-container'>
              <p className='match__text match__text-data'>
                {/* {moment(match.date).format('DD.MM.YYYY')} */}
              </p>
              <p className='match__text match__text-description'>Дата игры</p>
            </div>
          </div>
        </div>
        <button
          // onClick={handleDetail}
          type='button'
          className='match__more-btn'
        >
          <img src={play} alt='Подробнее об игре' />
          <p className='match__text-btn'>Подробнее об игре</p>
        </button>
      </div>
    </article>
  );
};

export default GameItem;
