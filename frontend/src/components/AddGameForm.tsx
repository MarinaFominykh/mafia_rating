import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import styles from '@/styles/AddGameForm.module.scss';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Popup from './Popup';
import Slider from './Slider';
import { useAppDispatch } from '@/hooks/redux';
import { gameAPI } from '@/services/GameService';
import { useFormWithValidation } from '@/hooks/UseFormValidation';
import InfoTooltip from './InfoTooltip';
import { hasDuplicates } from '@/utils/functions';
import { DUPLICATE_ELEMENTS } from '@/utils/constans';
import { SHERIFF, DONE, BLACK, RED } from '@/utils/constans';
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

export interface Error {
  data: {
    error: string;
    message: string;
    statusCode: number;
  };
  status: number;
}

const AddGameForm: FC<AddGameFormProps> = ({ isOpen, onClose }) => {
  const [createGame, { isSuccess, isError, error }] =
    gameAPI.useCreateGameMutation();
  const [message, setMessage] = useState('');
  const [isValidComposition, setIsValidComposition] = useState(false);

  const { values, handleChange, errors, isValid, resetForm, handleRemove } =
    useFormWithValidation();
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

  const showInfoToolTip = (error: string) => {
    setMessage(error);
    setTimeout(() => setMessage(''), 8000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
    const data = [...mafia, ...peace, sheriff, done];
    e.preventDefault();
    if (hasDuplicates(data)) {
      showInfoToolTip(DUPLICATE_ELEMENTS);
      return;
    }
    await createGame(newGame);
    if (isSuccess) {
      resetForm();
      onClose();
    }
    if (isError) {
      showInfoToolTip('Какая-то ошибка');
    }
  };

  useEffect(() => {
    if (mafia.length === 2 && peace.length === 6) {
      setIsValidComposition(true);
    } else setIsValidComposition(false);
  }, [values]);

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
          isValid={isValidComposition && isValid}
          errors={errors}
          errorCreate={error as Error}
          message={message}
        />

        {isError && <InfoTooltip error={message}></InfoTooltip>}
      </form>
    </Popup>
  );
};

export default AddGameForm;
