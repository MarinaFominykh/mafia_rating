import React, {
  FC,
  ReactNode,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from 'react';
import styles from '@/styles/EditPlayerForm.module.scss';
import Popup from './Popup';
import { userAPI } from '@/services/UserService';
import { IUser } from '@/models/IUser';
import Slider from './Slider';
import { useFormWithValidation } from '@/hooks/UseFormValidation';
import InfoTooltip from './InfoTooltip';
import { Error } from '@/models/Error';
import { CONFLICT_NAME_MESSAGE, INVALID_DATA_MESSAGE } from '@/utils/constans';
import { IDataUser } from '@/models/IDataUser';

interface EditPlayerFormProps {
  player: IDataUser | {};
  isOpen: boolean;
  onClose: () => void;
}

const EditPlayerForm: FC<EditPlayerFormProps> = ({
  isOpen,
  onClose,
  player,
}) => {
  const [message, setMessage] = useState('');
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const { editName } = values;
  const [editUser, { error, isError, isLoading, isSuccess }] =
    userAPI.useEditUserMutation();

  const showInfoToolTip = (error: string) => {
    setMessage(error);
    setTimeout(() => setMessage(''), 8000);
  };

  const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editUser({ _id: ('id' in player) ? player.id : '', name: editName})
    if(isSuccess) {
        onClose()
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
      <form className={styles.form} onSubmit={handleEdit}>
        <fieldset className={styles.fieldset}>
          <div className={styles.title_wrapper}>
            <h2 className={`form_title ${styles.title}`}>Настройки</h2>
            <button
              className={styles.close}
              type='button'
              onClick={onClose}
            ></button>
          </div>
          <label className='label'>
            Новое имя
            <input
              type='text'
              name='editName'
              placeholder='Введите имя'
              className='input'
              defaultValue={('name' in player) ? player.name : ''}
              //   value={values.editName || ''}
              onChange={handleChange}
              required
              minLength={2}
              maxLength={30}
            />
            <div className={styles.error}>
              <InfoTooltip error={errors.editName} />
            </div>
          </label>
        </fieldset>
        {isError && (
          <div className={styles.error}>
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

export default EditPlayerForm;
