import React, { FC, ReactNode } from 'react';
import styles from '@/styles/Slider.module.scss';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCube } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import InfoTooltip from './InfoTooltip';

// interface SwiperSlideWithFormProps {
//   children: React.ReactNode;
// }

// const SwiperSlideWithForm: FC<SwiperSlideWithFormProps> = ({ children }) => {
//   return (
//     <SwiperSlide>
//       <form>{children}</form>
//     </SwiperSlide>
//   );
// };

const Slider = () => {
  const pagination = {
    clickable: true,

    renderBullet: function (index: number, className: string) {
      // return '<span class="' + className + '">' + (index + 1) + '</span>';
      return (
        '<div class="' +
        className +
        '"><span class="bullet_fraction">' +
        (index + 1) +
        '</span><p class="bullet_text"></p></div>'
      );
      // return `<div class=${styles.bullet_wrapper}>
      //     <span></span>
      //     <p></p>
      //   </div>`
    },

    // modifierClass: `sdfsdkfjsdfj-`,

    bulletClass: `swiper-pagination-bullet ${styles.bullet_form}`,
  };

  const navigation = {
    disabledClass: `${styles.disabled_button}`,
    nextEl: '.next',
    prevEl: '.prev',
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
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
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
              name='titleAddGame'
              className={`input ${styles.input}`}
              type='text'
              placeholder='Введите название игры'
              required
            />
            <InfoTooltip error='Error' />
            <label className={`label ${styles.label}`} htmlFor='gmAddGame'>
              Выберите ведущего
            </label>
            <input
              id='titleAddGame'
              name='titleAddGame'
              className={`input ${styles.input}`}
              type='text'
              placeholder='Введите название игры'
              required
            />
            <InfoTooltip error='Error' />
          </fieldset>
          <fieldset className={`fieldset ${styles.fields_horizontal}`}>
            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='gmAddGame'
            >
              Дата окончания игры
              <input
                id='titleAddGame'
                name='titleAddGame'
                className={`input ${styles.input_horizontal}`}
                type='text'
                placeholder='Введите название игры'
                required
              />
              <InfoTooltip error='Error' />
            </label>

            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='gmAddGame'
            >
              Результат игры
              <input
                id='titleAddGame'
                name='titleAddGame'
                className={`input ${styles.input_horizontal}`}
                type='text'
                placeholder='Введите название игры'
                required
              />
              <InfoTooltip error='Error' />
            </label>
          </fieldset>
        </SwiperSlide>
        <SwiperSlide>
          <fieldset className={`fieldset ${styles.fields}`}>
            <label className={`label ${styles.label}`} htmlFor='titleAddGame'>
              Название игры
            </label>
            <input
              id='titleAddGame'
              name='titleAddGame'
              className={`input ${styles.input}`}
              type='text'
              placeholder='Введите название игры'
              required
            />
            <InfoTooltip error='Error' />
            <label className={`label ${styles.label}`} htmlFor='gmAddGame'>
              Выберите ведущего
            </label>
            <input
              id='titleAddGame'
              name='titleAddGame'
              className={`input ${styles.input}`}
              type='text'
              placeholder='Введите название игры'
              required
            />
            <InfoTooltip error='Error' />
          </fieldset>
          <fieldset className={`fieldset ${styles.fields_horizontal}`}>
            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='gmAddGame'
            >
              Дата окончания игры
              <input
                id='titleAddGame'
                name='titleAddGame'
                className={`input ${styles.input_horizontal}`}
                type='text'
                placeholder='Введите название игры'
                required
              />
              <InfoTooltip error='Error' />
            </label>

            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='gmAddGame'
            >
              Результат игры
              <input
                id='titleAddGame'
                name='titleAddGame'
                className={`input ${styles.input_horizontal}`}
                type='text'
                placeholder='Введите название игры'
                required
              />
              <InfoTooltip error='Error' />
            </label>
          </fieldset>
        </SwiperSlide>
        <SwiperSlide>
          <fieldset className={`fieldset ${styles.fields}`}>
            <label className={`label ${styles.label}`} htmlFor='titleAddGame'>
              Название игры
            </label>
            <input
              id='titleAddGame'
              name='titleAddGame'
              className={`input ${styles.input}`}
              type='text'
              placeholder='Введите название игры'
              required
            />
            <InfoTooltip error='Error' />
            <label className={`label ${styles.label}`} htmlFor='gmAddGame'>
              Выберите ведущего
            </label>
            <input
              id='titleAddGame'
              name='titleAddGame'
              className={`input ${styles.input}`}
              type='text'
              placeholder='Введите название игры'
              required
            />
            <InfoTooltip error='Error' />
          </fieldset>
          <fieldset className={`fieldset ${styles.fields_horizontal}`}>
            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='gmAddGame'
            >
              Дата окончания игры
              <input
                id='titleAddGame'
                name='titleAddGame'
                className={`input ${styles.input_horizontal}`}
                type='text'
                placeholder='Введите название игры'
                required
              />
              <InfoTooltip error='Error' />
            </label>

            <label
              className={`label ${styles.label} ${styles.label_horizontal}`}
              htmlFor='gmAddGame'
            >
              Результат игры
              <input
                id='titleAddGame'
                name='titleAddGame'
                className={`input ${styles.input_horizontal}`}
                type='text'
                placeholder='Введите название игры'
                required
              />
              <InfoTooltip error='Error' />
            </label>
          </fieldset>
        </SwiperSlide>
      </Swiper>
      <div className={styles.buttons}>
        <button type='button' className={`prev button ${styles.prev_button}`}>
          Назад
        </button>
        <button type='button' className={`next button ${styles.next_button}`}>
          Далее
        </button>
      </div>
    </>
  );
};

export default Slider;
