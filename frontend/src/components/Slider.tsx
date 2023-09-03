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

interface SliderProps {
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

}
const Slider: FC<SliderProps> = ({ onInputChange}) => {
  const [value, setValue] = useState('');
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

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

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
              // required
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
              // required
              onChange={onInputChange}
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
                type='date'
                // required
                onChange={onInputChange}
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
                // required
                onChange={onInputChange}
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
          <fieldset className={`fieldset ${styles.fields}`}>
            <label className={`label ${styles.label}`} htmlFor='mafiaAddGame'>
              Мафия
            </label>
            <select
              id='mafiaAddGame'
              name='mafia'
              className={`input ${styles.input}`}
            
              // required
              // onChange={onInputChange}
              onChange={onInputChange}
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
            <label className={`label ${styles.label}`} htmlFor='doneAddGame'>
              Дон
            </label>
            <select
              id='doneAddGame'
              name='done'
              className={`input ${styles.input}`}
              // required
              onChange={onInputChange}
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
            <label className={`label ${styles.label}`} htmlFor='sheriffAddGame'>
              Шериф
            </label>
            <select
              id='sheriffAddGame'
              name='sheriff'
              className={`input ${styles.input}`}
              // required
              onChange={onInputChange}
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
            <label className={`label ${styles.label}`} htmlFor='peaceAddGame'>
              Мирные жители
            </label>
            <select
              id='peaceAddGame'
              name='peace'
              className={`input ${styles.input}`}
              // required
              onChange={onInputChange}
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
              // required
              onChange={onInputChange}
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
              <label className={`label ${styles.label}`} htmlFor='mkAddGame'>
              МК
            </label>
            <select
              id='mkAddGame'
              name='modKill'
              className={`input ${styles.input}`}
              // required
              onChange={onInputChange}
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
