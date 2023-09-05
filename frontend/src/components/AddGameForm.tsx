import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import styles from '@/styles/AddGameForm.module.scss';
import Popup from './Popup';
import Slider from './Slider';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { gameAPI } from '@/services/GameService';
import { IUser } from '@/models/IUser';
import { IGame } from '@/models/IGame';
import { getData } from '../store/reducers/DataFormSlice';
import { gameFormSlice } from '../store/reducers/DataFormSlice';
import {
  RED_RESULT,
  BLACK_RESULT,
  EQUALITY_RESULT,
  SHERIFF,
  DONE,
  BLACK,
  RED,
  BEST_PLAYER,
  MODKILL,
} from '@/utils/constans';
interface AddGameFormProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface FormValues {
  // [key: string]: any;
  title: string;
  gameMaster: string;
  result: string;
  date: string;
  mafia: string[];
  done: string;
  sheriff: string;
  peace: string[];
  bestPlayer: string[];
  modKill: string[];
}

const AddGameForm: FC<AddGameFormProps> = ({ isOpen, onClose }) => {
  let mafia: string[] = [];
  const [createGame] = gameAPI.useCreateGameMutation();
  const dispatch = useAppDispatch();
  const { title, gameMaster, date, result, players } = useAppSelector(
    (state) => state.dataFormSlice
  );
  const [formValues, setFormValues] = useState<FormValues>({
    title: '',
    gameMaster: '',
    result: '',
    date: '',
    mafia: [],
    done: '',
    sheriff: '',
    peace: [],
    bestPlayer: [],
    modKill: [],
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (
      name === 'mafia' ||
      name === 'peace' ||
      name === 'bestPlayer' ||
      name === 'modKill'
    ) {
      setFormValues({ ...formValues, [name]: [...formValues[name], value] });
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleRemove = (id: string, field: string) => {
    if (
      field === 'mafia' ||
      field === 'peace' ||
      field === 'bestPlayer' ||
      field === 'modKill'
    ) {
      setFormValues({
        ...formValues,
        [field]: formValues[field].filter((playerId: string) => {
          return playerId !== id;
        }),
      });
    } else {
      setFormValues({ ...formValues, [field]: '' });
    }
  };

  // const handleInputChange = (
  //   event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;
  //   dispatch(
  //       getData({
  //         title: value,
  //         gameMaster: value,
  //         date: value,
  //         result: value,
  //         players: [],
  //       })
  //     );
  // };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const {
      title,
      gameMaster,
      date,
      result,
      done,
      sheriff,
      mafia,
      peace,
      bestPlayer,
      modKill,
    } = formValues;
    const newGame = {
      title,
      gameMaster,
      date,
      result,
      players: [
        {
          user: sheriff,
          role: SHERIFF,
          bestPlayer: bestPlayer.some((bp) => {
            return bp === sheriff;
          }),
          modKill: modKill.some((mk) => {
            return mk === sheriff;
          }),
        },
        {
          user: done,
          role: DONE,
          bestPlayer: bestPlayer.some((bp) => {
            return bp === done;
          }),
          modKill: modKill.some((mk) => {
            return mk === done;
          }),
        },
        ...peace.map((item) => {
          return {
            user: item,
            role: RED,
            bestPlayer: bestPlayer.some((bp) => {
              return bp === item;
            }),
            modKill: modKill.some((mk) => {
              return mk === item;
            }),
          };
        }),
        ...mafia.map((item) => {
          return {
            user: item,
            role: BLACK,
            bestPlayer: bestPlayer.some((bp) => {
              return bp === item;
            }),
            modKill: modKill.some((mk) => {
              return mk === item;
            }),
          };
        }),
      ],
    };
    e.preventDefault();
    await createGame(newGame);
    setFormValues({
    title: '',
    gameMaster: '',
    result: '',
    date: '',
    mafia: [],
    done: '',
    sheriff: '',
    peace: [],
    bestPlayer: [],
    modKill: [],
  })
    onClose();

  };
  return (
    <Popup isOpen={isOpen}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title_wrapper}>
          <h2 className={`form_title ${styles.title}`}>Создание игры</h2>
          <button
            className={styles.close}
            type='button'
            onClick={onClose}
          ></button>
        </div>
        <Slider
          onInputChange={handleInputChange}
          dataForm={formValues}
          onRemove={handleRemove}
        />
      </form>
    </Popup>
  );
};

export default AddGameForm;
