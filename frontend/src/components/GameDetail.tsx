import React, { FC, useState } from 'react';
import styles from '@/styles/GameDetail.module.scss';
import Popup from './Popup';
import InfoTooltip from './InfoTooltip';
import { IGame } from '@/models/IGame';
import moment from 'moment';
import Image from 'next/image';
import { BEST, MK } from '@/utils/constans';

interface GameDetailProps {
  isOpen: boolean;
  onClose: () => void;
  game: IGame | {};
}
const GameDetail: FC<GameDetailProps> = ({ isOpen, onClose, game }) => {
  const [message, setMessage] = useState('');
  return (
    <Popup isOpen={isOpen}>
      <article className={styles.card}>
        <div className={styles.head}>
          <h2 className={styles.title}>{'title' in game ? game.title : ''}</h2>
          <button
            type='button'
            className={styles.close}
            onClick={onClose}
          ></button>
        </div>
        <div className={styles.result}>
          {'result' in game ? game.result : ''}
        </div>
        <div className={styles.result_container}>
          <div className={styles.result_item}>
            <Image
              src={`/images/icons/gamemaster.svg`}
              width='30'
              height='30'
              alt='Ведущий'
            />
            <div className={styles.result_text_cntr}>
              <p className={`${styles.result_text} ${styles.result_name}`}>
                {'gameMaster' in game ? game.gameMaster.name : ''}
              </p>
              <p
                className={`${styles.result_text} ${styles.result_description}`}
              >
                Ведущий
              </p>
            </div>
          </div>
          <div className={styles.result_item}>
            <Image
              src={`/images/icons/calendar.svg`}
              width='30'
              height='30'
              alt='Дата игры'
            />
            <div className={styles.result_text}>
              <time
                className={`${styles.result_text} ${styles.result_name}`}
                dateTime={'date' in game ? game.date : ''}
              >
                {moment('date' in game ? game.date : '').format('DD.MM.YYYY')}
              </time>
              <p
                className={`${styles.result_text} ${styles.result_description}`}
              >
                Дата игры
              </p>
            </div>
          </div>
        </div>
        <div className={styles.users_head}>
          <Image
            src={`/images/icons/fluent_people-20-regular.svg`}
            width='30'
            height='30'
            alt='Участники'
          />
          <p className={styles.users_title}>Участники</p>
        </div>
        <div className={styles.users_wrapper}>
          <ul className={`ul ${styles.list}`}>
            {'players' in game &&
              game.players.map((player) => {
                return (
                  <li key={player.user._id} className={styles.users_item}>
                    <div className={styles.name_cntr}>
                      <p className={styles.name}>{player.user.name}</p>
                      {player.bestPlayer &&  <div className={`${styles.best} ${styles.tooltip}`} data-tooltip={BEST}></div>}
                      {player.modKill &&  <div className={`${styles.mk} ${styles.tooltip}`} data-tooltip={MK}>
                        
                        </div>}
                     
                    </div>
                    <p className={styles.role}>{player.role}</p>
                  </li>
                );
              })}
          </ul>
        </div>
        <InfoTooltip error={message} />
        <div className={styles.buttons}>
          <button type='button' className={styles.close_btn} onClick={onClose}>
            Закрыть
          </button>
          <button
            type='button'
            className={styles.edit_btn}
            // onClick={handlerEdit}
            // disabled={!loggedIn}
          >
            Редактировать
          </button>
        </div>
      </article>
    </Popup>
  );
};

export default GameDetail;
