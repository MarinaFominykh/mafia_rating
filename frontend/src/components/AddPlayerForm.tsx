import React, { FC, ReactNode, useState, ChangeEvent, FormEvent } from 'react';
import styles from '@/styles/AddPlayerForm.module.scss';
import Popup from './Popup';
import { userAPI } from '@/services/UserService';
import { IUser } from '@/models/IUser';
import Slider from './Slider';
import { useFormWithValidation } from '@/hooks/UseFormValidation';
import InfoTooltip from './InfoTooltip';

interface AddPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlayerForm: FC<AddPlayerFormProps> = ({ isOpen, onClose }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const { name } = values;
  const [
    createUser,
    { error: createError, isLoading: isCreateLoading, isSuccess },
  ] = userAPI.useCreateUserMutation();

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setName(e.target.value);
  // };

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({ name } as IUser);
    if (isSuccess) {
      resetForm();
      onClose();
    } else console.log('какая-то ошибка=>', createError);
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
            name='name'
            placeholder='Введите имя'
            className='input'
            value={values.name || ''}
            onChange={handleChange}
            required
          />
          <InfoTooltip error={errors.name} />
        </fieldset>

        <button disabled={!isValid} className={styles.submit} type='submit'>
          Cохранить
        </button>
      </form>
    </Popup>
  );
};

export default AddPlayerForm;
