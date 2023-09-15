import React, {ChangeEvent, FC} from 'react';
import styles from '@/styles/RatingMain.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { YEAR_OPTIONS } from '@/utils/constans';
import { yearRating } from '@/store/selectPeriodReducer';
import RatingTable from './RatingTable';
import { filterResult } from '@/utils/functions';
import { gameAPI } from '../services/GameService';
import { IDataUser } from '@/models/IDataUser';

interface RatingMainProps {
  handleAddPlayer: () => void;
   openProfile: (player: IDataUser) => void;
}
const RatingMain: FC <RatingMainProps> = ({handleAddPlayer, openProfile}) => {
  const { data: games } = gameAPI.useFetchAllGamesQuery('');
  const dispatch = useAppDispatch();
  const { valueRaiting: period } = useAppSelector((state) => state.selectYearReducer);
  const {filterGamesRate} = useAppSelector((state) => state.selectYearReducer) 
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(yearRating(e.target.value));
  };
  return (
    <section>
      <div className={styles.head}>
        <div className={styles.title_cont}>
          <h1 className={styles.title}>Рейтинг</h1>
          <p className={styles.amount}>Количество игр: {filterGamesRate?.length}</p>
        </div>
        <form className={styles.select_form}>
          <select
            className={styles.select}
            name='period'
            value={period}
            onChange={handleSelectChange}
          >
            {YEAR_OPTIONS.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
          </select>
        </form>
      </div>

      <div className={styles.count}>
        <p className={styles.count_text}>Город</p>
        <p className={styles.count_number}>
          {filterResult(filterGamesRate, "Победа города")}
        </p>
        <p className={styles.count_separator}>:</p>
        <p className={styles.count_number}>
          {filterResult(filterGamesRate, "Победа мафии")}
        </p>
        <p className={styles.count_text}>Мафия</p>
      </div>
      <RatingTable handleAddPlayer={handleAddPlayer} openProfile={openProfile}/>
      {/* <RateTable /> */}
    </section>
  );
};

export default RatingMain;
