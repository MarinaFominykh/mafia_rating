import React, { FC, FormEvent, ChangeEvent, useState, useEffect } from 'react';
import styles from '@/styles/AddGameForm.module.scss';
import Popup from './Popup';
import Slider from './Slider';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { gameAPI } from '@/services/GameService';
import { IUser } from '@/models/IUser';
import { IGame } from '@/models/IGame';

interface AddGameFormProps {
  isOpen: boolean;
  onClose: () => void;
}
interface FormValues {
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
  const [mafia, setMafia] = useState<string[]>([]);

  const [createGame] = gameAPI.useCreateGameMutation();
  //  const dispatch = useAppDispatch();
  // const {title, gameMaster, date, result, players} = useAppSelector((state) => state.GameFormReducer);
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
    if (name === 'mafia' || name === 'peace' || name === 'bestPlayer' || name === 'modKill') {
    setFormValues({ ...formValues, [name]: [...formValues[name], value] });
  }  else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const newGame = {
      _id: '12346',
      title: 'New',
      gameMaster: '64e2fde5da28496ed82cc274',
      date: '2020-04-21T00:00:00.000+00:00',
      result: 'Победа города',
      players: [
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'шериф',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'дон',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мафия',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мафия',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мирный',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мирный',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мирный',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мирный',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мирный',
        },
        {
          user: '64e2fde5da28496ed82cc2a5',
          role: 'мирный',
        },
      ],
    };
    e.preventDefault();
    console.log('formValues=>', formValues)
    // await createGame({
    //   title: 'New',
    //   gameMaster: '64e2fde5da28496ed82cc274',
    //   date: '2020-04-21T00:00:00.000+00:00',
    //   result: 'Победа города',
    //   players: [{
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'шериф'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'дон'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мафия'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мафия'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мирный'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мирный'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мирный'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мирный'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мирный'
    //   },
    //   {
    //      user: '64e2fde5da28496ed82cc2a5',
    //     role: 'мирный'
    //   },

    //   ]

    // });

    // const players = [
    //   { user: formValues.mafia, role: 'мафия' },
    //   { user: formValues.done, role: 'дон' },
    //   { user: formValues.sheriff, role: 'шериф' },
    //   { user: formValues.peace, role: 'мирный' },
    // ];

    // const data = {
    //   title: formValues.title,
    //   gameMaster: formValues.gameMaster,
    //   date: formValues.date,
    //   result: formValues.result,
    //   //   players: [
    //   // {user:
    //   //   role:
    //   //   modKill:
    //   //   bestPlayer: }
    //   //   ]
    // };
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
          
        />
      </form>
    </Popup>
  );
};

export default AddGameForm;
