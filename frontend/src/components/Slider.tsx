import React, { FC, ReactNode, ChangeEvent, FormEvent, useState } from 'react';
import styles from '@/styles/Slider.module.scss';
import Select from 'react-select';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { userAPI } from '@/services/UserService';
import { optionsUser } from '../utils/functions';
import { optionsResult } from '@/utils/constans';
import InfoTooltip from './InfoTooltip';
import { FormValues } from './AddGameForm';
import { mapIdsToNames, mapIdToName } from '../utils/functions';
import { useFormWithValidation } from '@/hooks/UseFormValidation';

interface SliderProps {
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  dataForm: FormValues;
  onRemove: (id: string, field: string) => void;
  isValid: boolean;
  errors: any;
}
const Slider: FC<SliderProps> = ({
  onInputChange,
  dataForm,
  onRemove,
  isValid,
  errors,
}) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return (
        '<div class="' +
        className +
        '"><span class="bullet_fraction">' +
        (index + 1) +
        '</span><p class="bullet_text"></p></div>'
      );
    },
    bulletClass: `swiper-pagination-bullet ${styles.bullet_form}`,
  };

  const navigation = {
    disabledClass: `${styles.disabled_button}`,
    nextEl: '.next',
    prevEl: '.prev',
  };

  const {
    data: users,
    error,
    isLoading,
    isSuccess,
  } = userAPI.useFetchAllUsersQuery('');
  const {
    title,
    date,
    result,
    gameMaster,
    mafia,
    done,
    sheriff,
    peace,
    bestPlayer,
    modKill,
  } = dataForm;
  // const { errors } = useFormWithValidation();

  const mafiaArray = mapIdsToNames(mafia, users);
  const doneObj = mapIdToName(done, users);
  const sheriffObj = mapIdToName(sheriff, users);
  const peaceArray = mapIdsToNames(peace, users);
  const bpArray = mapIdsToNames(bestPlayer, users);
   const mkArray = mapIdsToNames(modKill, users);
  let currentPlayerArray = [...mafiaArray];
  if (doneObj.name && doneObj.id) {
    currentPlayerArray.push(doneObj);
  }
  if (sheriffObj.name && sheriffObj.id) {
    currentPlayerArray.push(sheriffObj);
  }
  currentPlayerArray = [...currentPlayerArray, ...peaceArray];

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={navigation}
        pagination={pagination}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        className={styles.swiper_form}
        speed={1000}
      >
        <SwiperSlide>
          <fieldset className={`fieldset ${styles.fields}`}>
            <label className={`label ${styles.label}`} htmlFor='titleAddGame'>
              Название игры
              <input
                id='titleAddGame'
                name='title'
                className={`input ${styles.input}`}
                type='text'
                onChange={onInputChange}
                value={title}
                required
              />
              <InfoTooltip error={errors.title} />
            </label>

            <label className={`label ${styles.label}`} htmlFor='gmAddGame'>
              Выберите ведущего
              <select
                id='gmAddGame'
                name='gameMaster'
                className={`input ${styles.input}`}
                placeholder='Выберите ведущего'
                required
                onChange={onInputChange}
                value={gameMaster}
              >
                <option></option>
                {users?.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <InfoTooltip error={errors.gameMaster} />
            </label>
          </fieldset>
          <fieldset className={`fieldset ${styles.fields_horizontal}`}>
            <label className={`label ${styles.label}`} htmlFor='dateAddGame'>
              Дата окончания игры
              <input
                id='dateAddGame'
                name='date'
                className={`input ${styles.input_horizontal}`}
                placeholder=''
                type='date'
                required
                onChange={onInputChange}
                value={date}
              />
              <InfoTooltip error={errors.date} />
            </label>

            <label className={`label ${styles.label}`} htmlFor='resultAddGame'>
              Результат игры
              <select
                id='resultAddGame'
                name='result'
                className={`input ${styles.input_horizontal}`}
                required
                onChange={onInputChange}
                value={result}
              >
                <option></option>
                {optionsResult.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <InfoTooltip error={errors.result} />
            </label>
          </fieldset>
        </SwiperSlide>
        <SwiperSlide>
          <fieldset
            className={`fieldset ${styles.fields} ${styles.fields_players}`}
          >
            <label className={`label ${styles.label}`} htmlFor='mafiaAddGame'>
              Мафия
              <select
                id='mafiaAddGame'
                name='mafia'
                className={`input ${styles.input}`}
                disabled={mafiaArray.length === 2}
                required
                onChange={onInputChange}
                defaultValue={''}
              >
                <option></option>
                {users?.map((user, i) => {
                  return (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <div className={styles.nicks_container}>
                <p className={styles.selected}>
                  Выбрано: {mafiaArray.length}/2
                </p>
                <ul className={styles.nicks}>
                  {mafiaArray.map((item: { id: string; name: string }) => {
                    return (
                      <li key={item.id} className={styles.nick}>
                        <p className={styles.nick_text}>{item.name}</p>
                        <button
                          onClick={() => onRemove(item.id, 'mafia')}
                          className={styles.nick_button}
                        ></button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </label>

            <label className={`label ${styles.label}`} htmlFor='doneAddGame'>
              Дон
              <select
                id='doneAddGame'
                name='done'
                className={`input ${styles.input}`}
                required
                onChange={onInputChange}
                disabled={doneObj.name}
              >
                <option></option>
                {users?.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <div className={styles.nicks_container}>
                <p className={styles.selected}>Выбрано: {done ? 1 : 0}/1</p>
                {done && (
                  <div className={styles.nick}>
                    <p className={styles.nick_text}>{doneObj.name}</p>
                    <button
                      onClick={() => onRemove(doneObj.id, 'done')}
                      className={styles.nick_button}
                    ></button>
                  </div>
                )}
              </div>
            </label>

            <label className={`label ${styles.label}`} htmlFor='sheriffAddGame'>
              Шериф
              <select
                id='sheriffAddGame'
                name='sheriff'
                className={`input ${styles.input}`}
                required
                onChange={onInputChange}
                disabled={sheriffObj.name}
              >
                <option></option>
                {users?.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <div className={styles.nicks_container}>
                <p className={styles.selected}>Выбрано: {sheriff ? 1 : 0}/1</p>
                {sheriff && (
                  <div className={styles.nick}>
                    <p className={styles.nick_text}>{sheriffObj.name}</p>
                    <button
                      onClick={() => onRemove(sheriffObj.id, 'sheriff')}
                      className={styles.nick_button}
                    ></button>
                  </div>
                )}
              </div>
              {/* <InfoTooltip error='Error' /> */}
            </label>

            <label className={`label ${styles.label}`} htmlFor='peaceAddGame'>
              Мирные жители
              <select
                id='peaceAddGame'
                name='peace'
                className={`input ${styles.input}`}
                required
                onChange={onInputChange}
                disabled={peace.length === 6}
              >
                <option></option>
                {users?.map((user) => {
                  return (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <div className={`${styles.nicks_container}`}>
                <p className={styles.selected}>Выбрано: {peace.length}/6</p>
                <ul className={styles.peace_container}>
                  {peaceArray.map((item: { id: string; name: string }) => {
                    return (
                      <li key={item.id} className={styles.nick}>
                        <p className={styles.nick_text}>{item.name}</p>
                        <button
                          onClick={() => onRemove(item.id, 'peace')}
                          className={styles.nick_button}
                        ></button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </label>
          </fieldset>
        </SwiperSlide>
        <SwiperSlide>
          <fieldset className={`fieldset ${styles.fields}`}>
            <label className={`label ${styles.label}`} htmlFor='bpAddGame'>
              Лучший игрок
              <select
                id='bpAddGame'
                name='bestPlayer'
                className={`input ${styles.input}`}
                onChange={onInputChange}
              >
                <option></option>
                {currentPlayerArray?.map((user) => {
                  return (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </select>
              <div className={`${styles.nicks_container}`}>
                <ul className={styles.peace_container}>
                  {bpArray.map(
                    (item: {id: string, name: string}) => {
                      return (
                        <li key={item.id} className={styles.nick}>
                          <p className={styles.nick_text}>{item.name}</p>
                          <button
                            onClick={() => onRemove(item.id, 'bestPlayer')}
                            className={styles.nick_button}
                          ></button>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </label>

            <label className={`label ${styles.label}`} htmlFor='mkAddGame'>
              МК
               <select
              id='mkAddGame'
              name='modKill'
              className={`input ${styles.input}`}
              onChange={onInputChange}
            >
              <option></option>
              {currentPlayerArray?.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
               <div className={`${styles.nicks_container}`}>
                <ul className={styles.peace_container}>
                  {mkArray.map(
                    (item: {id: string, name: string}) => {
                      return (
                        <li key={item.id} className={styles.nick}>
                          <p className={styles.nick_text}>{item.name}</p>
                          <button
                            onClick={() => onRemove(item.id, 'modKill')}
                            className={styles.nick_button}
                          ></button>
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </label>
           
           
          </fieldset>
        </SwiperSlide>
      </Swiper>
      <div className={styles.buttons}>
        <button type='button' className={`prev button ${styles.prev_button}`}>
          Назад
        </button>
        <button
          type='submit'
          className={`button ${styles.submit}`}
          disabled={!isValid}
        >
          Сохранить
        </button>
        <button type='button' className={`next button ${styles.next_button}`}>
          Далее
        </button>
      </div>
    </>
  );
};

export default Slider;
