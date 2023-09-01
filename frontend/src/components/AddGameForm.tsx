import React, { FC, FormEvent, ChangeEvent, useState, useEffect} from 'react';
import styles from '@/styles/AddGameForm.module.scss';
import Popup from './Popup';
import Slider from './Slider';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { gameFormSlice } from '@/store/reducers/GameFormSlice';


interface AddGameFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGameForm: FC<AddGameFormProps> = ({ isOpen, onClose }) => {
   const dispatch = useAppDispatch();
  const {title, gameMaster, date, result, players} = useAppSelector((state) => state.GameFormReducer);
  const [formValues, setFormValues] = useState({
    title: '',
    gameMaster: '',
    result: '',
    date: '',
    mafia: '',
    done: '',
    sheriff: '',
    peace: '',
    bestPlayer: '',
    modKill: '',
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // useEffect(() => {
  //   dispatch(gameFormSlice.actions.createGame())
  // })
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const players = [
      { user: formValues.mafia, role: 'мафия' },
      { user: formValues.done, role: 'дон' },
      { user: formValues.sheriff, role: 'шериф' },
      { user: formValues.peace, role: 'мирный' },
    ];

    const data = {
      title: formValues.title,
      gameMaster: formValues.gameMaster,
      date: formValues.date,
      result: formValues.result,
      //   players: [
      // {user:
      //   role:
      //   modKill:
      //   bestPlayer: }
      //   ]
    };
    console.log('players=>', players);
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
        <Slider onInputChange={handleInputChange} />
      </form>
    </Popup>
  );
};

export default AddGameForm;
