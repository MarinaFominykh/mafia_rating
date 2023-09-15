import React, { useEffect, useState, FC } from 'react';
import styles from '@/styles/RatingTable.module.scss';
import type { RootState } from '../store';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { useDispatch, useSelector } from 'react-redux';
import { userSlice } from '@/store/reducers/UserSlice';
import { playerSlice } from '@/store/reducers/PlayerSlice';
import { fetchUsers } from '@/store/reducers/ActionCreators';
import { userAPI } from '@/services/UserService';
import { IUser } from '@/models/IUser';
import Player from './PlayerRow';
import PlayerRow from './PlayerRow';
import {
  countGames,
  blackWin,
  redWin,
  totalWin,
  blackTotal,
  redTotal,
  sheriffTotal,
  sheriffWin,
  doneTotal,
  doneWin,
  bestPlayer,
  modKill,
  rating,
  filterGames
} from '../utils/functions';
import { gameAPI } from '../services/GameService';
import { IDataUser } from '@/models/IDataUser';

interface RatingTableProps {
  handleAddPlayer: () => void;
  openProfile: (player: IDataUser) => void;
}

const RatingTable: FC<RatingTableProps> = ({
  handleAddPlayer,
  openProfile,
}) => {
  let playerArray;
  const dispatch = useAppDispatch();
  const { data: games } = gameAPI.useFetchAllGamesQuery('');
  const {
    data: users,
    error,
    isLoading,
    isSuccess,
  } = userAPI.useFetchAllUsersQuery('');
  const [createUser, { error: createError, isLoading: isCreateLoading }] =
    userAPI.useCreateUserMutation();
  const [
    deleteUser,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess: isDeleteSuc },
  ] = userAPI.useDeleteUserMutation();
  const [editUser, {}] = userAPI.useEditUserMutation();
  const { players } = useAppSelector((state) => state.playerReducer);
  const { valueRaiting: period } = useAppSelector((state) => state.selectYearReducer);
  const [filteredGames, setFilteredGames] = useState(games);

  const handleCreate = async () => {
    const name = prompt();
    await createUser({ name } as IUser);
  };
  const handleRemove = (user: IUser) => {
    deleteUser(user);
  };

  const handleEdit = (user: IUser) => {
    editUser(user);
  };

  const sortData = (field: string) => {
    console.log('sortPlayers=>', field);
  };
   useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  useEffect(() => {
    setFilteredGames(filterGames(games, period));
  }, [period]);
  useEffect(() => {
    playerArray = users
      ?.map((user) => {
        return {
          id: user._id,
          name: user.name,
          wins: totalWin(filteredGames, user),
          games: countGames(filteredGames, user),
          best: bestPlayer(filteredGames, user),
          rating: rating(filteredGames, user),
          blackGames: blackTotal(filteredGames, user),
          blackWins: blackWin(filteredGames, user),
          redGames: redTotal(filteredGames, user),
          redWins: redWin(filteredGames, user),
          sheriffGames: sheriffTotal(filteredGames, user),
          sheriffWins: sheriffWin(filteredGames, user),
          doneGames: doneTotal(filteredGames, user),
          doneWins: doneWin(filteredGames, user),
          mk: modKill(filteredGames, user),
         
        };
      })
      .sort(function (a, b) {
        return a.rating < b.rating ? 1 : -1;
      });
    if (playerArray) {
      dispatch(playerSlice.actions.usersTransform(playerArray));
    }
    // console.log('playerArray', playerArray)
  }, [users, games, period]);
  // console.log('filterGames', filteredGames)

  // useEffect(() => {
  //  dispatch(playerSlice.actions.usersTransform(playerArray))
  // }, [])

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <th className={`${styles.cell} ${styles.cell_head}`}>№</th>
            <th
              className={`${styles.cell} ${styles.cell_head} ${styles.name}`}
              onClick={() => sortData('name')}
            >
              Ник игрока
            </th>
            <th
              className={`${styles.cell} ${styles.cell_head} ${styles.hidden}`}
              onClick={() => sortData('matches')}
            >
              Количество игр
            </th>
            <th
              className={`${styles.cell} ${styles.cell_head} ${styles.hidden}`}
              onClick={() => sortData('victory')}
            >
              Побед
            </th>
            <th
              className={`${styles.cell} ${styles.cell_head} ${styles.hidden}`}
              onClick={() => sortData('bestPlayer')}
            >
              Лучший игрок
            </th>
            <th
              className={`${styles.cell} ${styles.cell_head} ${styles.rating}`}
              onClick={() => sortData('rating')}
            >
              Рейтинг
            </th>
            <th
              className={`${styles.cell} ${styles.cell_head} ${styles.hidden}`}
            >
              <button onClick={handleAddPlayer} className='button'>
                Новый игрок +
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player, index) => {
            return (
              <PlayerRow
                key={player.id}
                player={player}
                // user={user}
                remove={handleRemove}
                edit={handleEdit}
                openProfile={openProfile}
              />
            );
          })}
        </tbody>
      </table>
    </div>
    // <ul>
    //   {isLoading && <span>Loading...</span>}
    //   {error && <span>Произошла ошибка при загрузке пользователей</span>}
    //   {users?.map((user) => (
    //     <Player
    //       key={user._id}
    //       user={user}
    //       remove={handleRemove}
    //       edit={handleEdit}
    //     />
    //   ))}
    //   <button onClick={handlerCreate}>Add user</button>
    // </ul>
  );
};

export default RatingTable;
