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

interface SliderProps {
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  dataForm: FormValues;
  onRemove: (id: string, field: string) => void;
}
const Slider: FC<SliderProps> = ({ onInputChange, dataForm, onRemove }) => {
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

  const mafiaArray = mapIdsToNames(mafia, users);
  const doneObj = mapIdToName(done, users);
  const sheriffObj = mapIdToName(sheriff, users);
  const peaceArray = mapIdsToNames(peace, users);
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
            </label>
            <input
              id='titleAddGame'
              name='title'
              className={`input ${styles.input}`}
              type='text'
              onChange={onInputChange}
              value={title}
              required
            />
            <InfoTooltip error='Error' />
            <label className={`label ${styles.label}`} htmlFor='gmAddGame'>
              Выберите ведущего
            </label>
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
            <InfoTooltip error='Error' />
          </fieldset>
          <fieldset className={`fieldset ${styles.fields_horizontal}`}>
            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='dateAddGame'
            >
              Дата окончания игры
              <input
                id='dateAddGame'
                name='date'
                className={`input ${styles.input_horizontal}`}
                placeholder="" 
                type='date'
                required
                onChange={onInputChange}
                value={date}
              />
              <InfoTooltip error='Error' />
            </label>

            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='resultAddGame'
            >
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
                <option value='Победа города'>Победа города</option>
                <option value='Победа мафии'>Победа мафии</option>
                <option value='Ничья'>Ничья</option>
              </select>
              <InfoTooltip error='Error' />
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
               value={mafiaArray[mafiaArray.length-1]}
                
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
              {/* <InfoTooltip error='Error' /> */}
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
                value={done}
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
              {/* <InfoTooltip error='Error' /> */}
            </label>

            <label className={`label ${styles.label}`} htmlFor='sheriffAddGame'>
              Шериф
              <select
                id='sheriffAddGame'
                name='sheriff'
                className={`input ${styles.input}`}
                required
                onChange={onInputChange}
                value={sheriff}
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
                value={peaceArray[peaceArray.length-1]}
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
              {/* <InfoTooltip error='Error' /> */}
            </label>
          </fieldset>
        </SwiperSlide>
        <SwiperSlide>
          <fieldset className={`fieldset ${styles.fields}`}>
            <label className={`label ${styles.label}`} htmlFor='bpAddGame'>
              Лучший игрок
            </label>
            <select
              id='bpAddGame'
              name='bestPlayer'
              className={`input ${styles.input}`}
              required
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
            <InfoTooltip error='Error' />
            <label className={`label ${styles.label}`} htmlFor='mkAddGame'>
              МК
            </label>
            <select
              id='mkAddGame'
              name='modKill'
              className={`input ${styles.input}`}
              required
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
            <InfoTooltip error='Error' />
          </fieldset>
        </SwiperSlide>
      </Swiper>
      <div className={styles.buttons}>
        <button type='button' className={`prev button ${styles.prev_button}`}>
          Назад
        </button>
        <button type='submit' className='button'>
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
