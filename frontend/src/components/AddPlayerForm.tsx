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
import { Error } from './AddGameForm';

interface AddPlayerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPlayerForm: FC<AddPlayerFormProps> = ({ isOpen, onClose }) => {
  const [message, setMessage] = useState('');
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const { name } = values;
  const [createUser, { error, isLoading, isSuccess, isError }] =
    userAPI.useCreateUserMutation();

  const showInfoToolTip = (error: string) => {
    setMessage(error);
    setTimeout(() => setMessage(''), 8000);
  };
  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createUser({ name } as IUser);

    if (isSuccess) {
      console.log('isSuccess', isSuccess)
      // onClose();
      // resetForm();
    } else console.log('isSuccess 0', isSuccess)
  };
  console.log('isSuccess component', isSuccess)
  useEffect(() => {
    // Добавить проверку кода ошибки
    if (isError) {
      if((error as Error).status === 409)
      console.log('error=>', error)
      showInfoToolTip(`${(error as Error)?.data.message}`);
    } else if((error as Error)?.status === 400) {
      showInfoToolTip('Переданы некорректные данные (длина имени должна быть более 2 и менее 30 символов');
    }
    else console.log('error 2=>', error)
  }, [error, isError]);
 console.log('error in component', error)
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
            {/* <InfoTooltip error={`Произошла ошибка: ${(error as Error)?.data?.message} . Код ошибки: ${(error as Error)?.status}`}></InfoTooltip> */}
            <InfoTooltip error={message}></InfoTooltip>
          </div>
        )}

        <button disabled={!isValid} className={styles.submit} type='submit'>
          Сохранить
        </button>
      </form>
    </Popup>
  );
};

export default AddPlayerForm;
