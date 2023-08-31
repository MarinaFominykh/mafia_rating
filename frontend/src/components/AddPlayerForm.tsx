import React, { FC, ReactNode, useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/AddPlayerForm.module.scss';
import Popup from './Popup';
import { userAPI } from '@/services/UserService';
import { IUser } from '@/models/IUser';
import Slider from './Slider';

interface AddPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlayerForm: FC<AddPlayerFormProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [createUser, { error: createError, isLoading: isCreateLoading }] =
    userAPI.useCreateUserMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({ name } as IUser);
    setName('');
    onClose();
  };
  return (
    <Popup isOpen={isOpen}>
      <form className={styles.form} onSubmit={handleCreate}>
        <fieldset className={styles.fieldset}>
          <div className={styles.title_wrapper}>
            <h2 className={`form_title ${styles.title}`}>Новый игрок</h2>
            <button
              className={styles.close}
              type='button'
              onClick={onClose}
            ></button>
          </div>

          <input
            type='text'
            placeholder='Введите имя'
            className='input'
            value={name}
            onChange={handleChange}
          />
        </fieldset>

        <button className={styles.submit} type='submit'>
          Cохранить
        </button>
      </form>
    </Popup>
  );
};

export default AddPlayerForm;
