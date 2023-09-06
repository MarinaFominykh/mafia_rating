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
import { useFormWithValidation } from '@/hooks/UseFormValidation';
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
  const [createGame] = gameAPI.useCreateGameMutation();
  const dispatch = useAppDispatch();
  // const { title, gameMaster, date, result, players } = useAppSelector(
  //   (state) => state.dataFormSlice
  // );
    const { values, handleChange, errors, isValid, resetForm, handleRemove } =
    useFormWithValidation();
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
    } = values;
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
    resetForm();
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
          onInputChange={handleChange}
          dataForm={values}
          onRemove={handleRemove}
          isValid = {isValid}
          errors={errors}
        />
      </form>
    </Popup>
  );
};

export default AddGameForm;
