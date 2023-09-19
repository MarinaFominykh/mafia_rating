import React, { FC } from 'react';
import styles from '@/styles/Profile.module.scss';
import Popup from './Popup';
import Image from 'next/image';
// import { dataProfile } from '@/data/data';
import { IDataUser } from '@/models/IDataUser';

interface ProfileProps {
  isOpen: boolean;
  onClose: () => void;
  player: IDataUser | {};
  handleUpdateName: () => void;
}
const Profile: FC<ProfileProps> = ({ isOpen, onClose, player, handleUpdateName }) => {
  // const profiles = dataProfile.map((profile) => {
  //   return {...profile, blackGames: player.blackGames, redGames: player.redGames}
  // })

  return (
    <Popup isOpen={isOpen}>
      <article className={styles.profile}>
        <div>
          <div className={styles.head}>
            <h2 className={styles.title}>Профиль пользователя</h2>
            <button
              type='button'
              className={styles.close}
              onClick={onClose}
            ></button>
          </div>
          <div className={styles.name_container}>
            {/* <img src={avatar} alt="Аватар игрока" className="profile__avatar" /> */}
            <Image
              src='/images/icons/avatar.svg'
              width='64'
              height='64'
              alt='Аватар игрока'
            />
            <div className={styles.text_container}>
              <p className={styles.rating}>Рейтинг raiting</p>
              <p className={styles.name}>{('name' in player) ? player.name : ''}</p>
            </div>
          </div>
          <ul className={styles.data}>
            <li className={styles.item}>
              <div className={styles.wrapper}>
                <p className={styles.description}>Количество игр</p>
                <p className={styles.number}>{('games' in player) ? player.games : ''}</p>
              </div>
              <Image
                src={`/images/icons/profile_amount.svg`}
                width='48'
                height='48'
                alt='Количество игр'
              />
            </li>
            <li className={styles.item}>
              <div className={styles.wrapper}>
                <p className={styles.description}>Мафия (сыграно/побед)</p>
                <p className={styles.number}>
                 {('blackGames' in player) ? player.blackGames : ''}/{('blackWins' in player) ? player.blackWins : ''}
                </p>
              </div>
              <Image
                src={`/images/icons/profile_black.svg`}
                width='48'
                height='48'
                alt='Мафия'
              />
            </li>
            <li className={styles.item}>
              <div className={styles.wrapper}>
                <p className={styles.description}>Мирный (сыграно/побед)</p>
                <p className={styles.number}>
                  {('redGames' in player) ? player.redGames : ''}/{('redWins' in player) ? player.redWins : ''}
                </p>
              </div>
              <Image
                src={`/images/icons/profile_red.svg`}
                width='48'
                height='48'
                alt='Мирный'
              />
            </li>
            <li className={styles.item}>
              <div className={styles.wrapper}>
                <p className={styles.description}>Шериф (сыграно/побед)</p>
                <p className={styles.number}>
                 {('sheriffGames' in player) ? player.sheriffGames : ''}/{('sheriffWins' in player) ? player.sheriffWins : ''}
                </p>
              </div>
              <Image
                src={`/images/icons/profile_sheriff.svg`}
                width='48'
                height='48'
                alt='Шериф'
              />
            </li>
            <li className={styles.item}>
              <div className={styles.wrapper}>
                <p className={styles.description}>Дон (сыграно/побед)</p>
                <p className={styles.number}>
                  {('doneGames' in player) ? player.doneGames : ''}/{('doneWins' in player) ? player.doneWins : ''}
                </p>
              </div>
              <Image
                src={`/images/icons/profile_done.svg`}
                width='48'
                height='48'
                alt='Дон'
              />
            </li>
            {/* {profiles.map((profile) => {
              return (
                <li key={profile.id} className={styles.item}>
                  <div className={styles.wrapper}>
                    <p className={styles.description}>{profile.description}</p>
                    <p className={styles.number}>{profile[profile.field]}</p>
                  </div>
                  <Image
                    src={`/images/icons/${profile.src}.svg`}
                    width='48'
                    height='48'
                    alt={profile.description}
                  />
                </li>
              );
            })} */}

            <li className={styles.progress}>
              <div
                className={`${styles.text_container} ${styles.progress_item}`}
              >
                <p className={styles.description}>ModKill</p>
                <p className={styles.number}>{('mk' in player) ? player.mk : ''}</p>
              </div>
              <div
                className={`${styles.text_container} ${styles.progress_item}`}
              >
                <p className={styles.description}>Лучший игрок</p>
                <p className={styles.number}>{('best' in player) ? player.best : ''}</p>
              </div>
            </li>
          </ul>
          {/* <InfoTooltip message={message} /> */}
          <button
            onClick={handleUpdateName}
            type='button'
            className={styles.setting}
          >
            <p className={styles.setting_text}>Настройки пользователя</p>
            <Image
              src='/images/icons/fluent_settings-16-filled.svg'
              alt='Настройки пользователя'
              width='48'
              height='48'
            />
          </button>
        </div>

        <button type='button' className={styles.close_btn} onClick={onClose}>
          Закрыть
        </button>
      </article>
    </Popup>
  );
};

export default Profile;
