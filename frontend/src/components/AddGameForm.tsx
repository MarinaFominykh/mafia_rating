import React, { FC, FormEvent } from 'react';
import styles from '@/styles/AddGameForm.module.scss';
import Popup from './Popup';
import Slider from './Slider';

interface AddGameFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddGameForm: FC<AddGameFormProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('add game submit=>', e);
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
        <Slider />
        
      </form>
    </Popup>
  );
};

export default AddGameForm;
