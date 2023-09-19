import React, {useState, ChangeEvent, FC} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from  '../store';
import styles from '@/styles/GamesMain.module.scss';
import { YEAR_OPTIONS } from '@/utils/constans';
import GamesList from './GamesList';
import {getYear} from '@/store/selectPeriodReducer';
import { IGame } from '@/models/IGame';

interface GamesMainProps {
  openDetail: (game: IGame) => void;
}

const GamesMain: FC<GamesMainProps> = ({openDetail}) => {
    const dispatch = useDispatch();
    const period = useSelector((state: RootState) => state.selectYearReducer.valueGames);
 
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(getYear(e.target.value))

  }
  return (
    <>
      <div className={styles.head}>
        <h1 className={styles.title}>Игры</h1>
        <form className={styles.form}>
          <select
            className='select'
            name='period'
            value={period}
            onChange={handleChange}
          >
            {YEAR_OPTIONS.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </form>
      </div>
      <GamesList openDetail={openDetail} />
    </>
  );
};

export default GamesMain;
