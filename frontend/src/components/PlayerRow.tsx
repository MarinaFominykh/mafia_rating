import React, { FC, useEffect } from 'react';
import styles from '@/styles/PlayerRow.module.scss';
import stylesTable from '@/styles/RatingTable.module.scss';
import { IUser } from '@/models/IUser';
import { IDataUser } from '@/models/IDataUser';

interface PlayerRowProps {
  // user: IUser;
  player: IDataUser;
  remove: (user: IUser) => void;
  edit: (user: IUser) => void;
}

const PlayerRow: FC<PlayerRowProps> = ({ player, remove, edit }) => {
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation();
    remove({
      _id: player.id,
      name: player.name,
    });
  };

  const handleEdit = (event: React.MouseEvent) => {
    const name = prompt() || '';
    //  edit({...user, name})
    edit({ _id: player.id, name });
  };

  return (
    // <li>
    //   {user.name}
    //   <button onClick={handleRemove}>Delete</button>
    //   <button onClick={handleEdit}>Edit</button>
    // </li>
    <tr
      style={{ height: 62 }}
      className={styles.unit}
      // onClick={screenWidth < 769 ? handleProfile : undefined}
    >
      <td className={`${stylesTable.cell} ${styles.order}`}></td>
      <td className={`${stylesTable.cell} ${styles.name}`}>{player.name}</td>
      <td className={`${stylesTable.cell} ${styles.amount}`}>{player.games}</td>
      <td className={`${stylesTable.cell} ${styles.victory}`}>{player.wins}</td>
      <td className={`${stylesTable.cell} ${styles.bestPlayer}`}>{player.best}</td>
      <td className={`${stylesTable.cell} ${styles.rating}`}>{player.rating}</td>
      <td className={`${stylesTable.cell} ${styles.profile}`}>
        {' '}
        {/* <button className="table__profile-btn" onClick={handleUpdateUnith}> */}
        <button
          className={styles.table_button}
          // onClick={handleProfile}
        >
          Профиль
        </button>
      </td>
    </tr>
  );
};

export default PlayerRow;
