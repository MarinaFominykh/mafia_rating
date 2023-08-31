import React, { useEffect, FC } from 'react';
import styles from '@/styles/RatingTable.module.scss';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
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
  bestPlayer,
  modKill,
  rating,
} from '../utils/functions';
import { gameAPI } from '../services/GameService';

interface RatingTableProps {
  handleAddPlayer: () => void;
}

const RatingTable: FC<RatingTableProps> = ({handleAddPlayer}) => {
  let playerArray;
  const { data: games } = gameAPI.useFetchAllGamesQuery('');
  // UserService:
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

  // UserSlice:
  const dispatch = useAppDispatch();
  const { players } = useAppSelector((state) => state.playerReducer);

  useEffect(() => {
    playerArray = users?.map((user) => {
      return {
        id: user._id,
        name: user.name,
        wins: totalWin(games, user),
        games: countGames(games, user),
        best: bestPlayer(games, user),
        rating: rating(games, user),
        // blackVictory: blackWin(games, user),
        // redVictory: redWin(games, user),
        // modKill: modKill(games, user),
      };
    }).sort(function (a, b) {
      return a.rating < b.rating ? 1 : -1;
    });
    if (playerArray) {
      dispatch(playerSlice.actions.usersTransform(playerArray));
    }
  }, [users, games]);

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
