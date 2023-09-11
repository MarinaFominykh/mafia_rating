import React, {
  FC,
  ReactNode,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import styles from '@/styles/AddPlayerForm.module.scss';
import Popup from './Popup';
import { userAPI } from '@/services/UserService';
import { IUser } from '@/models/IUser';
import Slider from './Slider';
import { useFormWithValidation } from '@/hooks/UseFormValidation';
import InfoTooltip from './InfoTooltip';
import { Error } from '@/models/Error';
import { CONFLICT_NAME_MESSAGE, INVALID_DATA_MESSAGE } from '@/utils/constans';

interface AddPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlayerForm: FC<AddPlayerFormProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const { name } = values;
  const [
    createUser,
    { error, isLoading: isCreateLoading, isSuccess, isError },
  ] = userAPI.useCreateUserMutation();

  const showInfoToolTip = (error: string) => {
    setMessage(error);
    setTimeout(() => setMessage(''), 8000);
  };

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({ name } as IUser);
    if (isSuccess) {
      resetForm();
      onClose();
    }
  };
  useEffect(() => {
    // Добавить проверку кода ошибки
    if (isError) {
      if ((error as Error).status === 409) {
        showInfoToolTip(CONFLICT_NAME_MESSAGE);
      } else if ((error as Error)?.status === 400) {
        showInfoToolTip(INVALID_DATA_MESSAGE);
      } else
        showInfoToolTip(
          `Неизвестная ошибка. Код ошибки: ${(error as Error).status}`
        );
    }
  }, [error, isError]);
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
        {isError && (
          <div className={styles.error}>
            <InfoTooltip error={message}></InfoTooltip>
          </div>
        )}

        <button disabled={!isValid} className={styles.submit} type='submit'>
          Cохранить
        </button>
      </form>
    </Popup>
  );
};

export default AddPlayerForm;
