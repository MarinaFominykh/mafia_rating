import React, {FC, useState} from 'react';
import Link from 'next/link';
import styles from '@/styles/Header.module.scss';
// import { checkbox } from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import AddGameForm from './AddGameForm';
import { openPopup, closePopup } from '@/utils/functions';

// interface CheckboxState {
//   value: boolean;
// }
// interface RootState {
//   checkboxReducer: CheckboxState;
  
// }

// interface CheckboxAction {
//   type: string;
//   payload: boolean;
// }

const Header = () => {
  const [isAddGamePopupOpen, setIsAddGamePopupOpen] = useState(false);
//   const dispatch = useDispatch();
//  const checked = useSelector((state: RootState) => {
//   const { checkboxReducer } = state;
//   return checkboxReducer.value;
// });
  // function changeCheckbox() {
  //   dispatch(checkbox(!checked));
  // }
// const changeCheckbox = () => {
//   dispatch<CheckboxAction>({
//     type: 'CHANGE_CHECKBOX',
//     payload: !checked
//   });
// };

  // const className = checked ? "header__burger-input" : "";
  return (
    <>
     <header className={styles.header}>
      <div className={styles.header__container}>
        <div className={styles.header__navcontainer}>
          <div className={styles.header__logocontainer}>
            <label className={styles.header__burger}>
              <input
                type="checkbox"
                className={styles.header__burgerinput}
                // value={checked}
                // onChange={changeCheckbox}
              />
              <svg viewBox="0 0 32 32">
                <path
                  className={`${styles.line} ${styles.linetopbottom}`}
                  d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                ></path>
                <path className={styles.line} d="M7 16 27 16"></path>
              </svg>
            </label>
            <p className={styles.header__logo}>Mafia&nbsp;Rating</p>
          </div>
          <nav className={styles.header_navigation}>
            <ul className={styles.header__list}>
              <Link href='/' className={styles.header__link}>
                <li className={styles.header__item}>
                  <p className={styles.header__text}>Рейтинг</p>
                  <div
                    className={`${styles.header__icon} ${styles.header__rating}`}
                  ></div>
                </li>
              </Link>
              <Link href='/games' className={styles.header__link}>
                <li className={styles.header__item}>
                  <p className={styles.header__text}>Игры</p>
                  <div
                    className={`${styles.header__icon} ${styles.header__games}`}
                  ></div>
                </li>
              </Link>
            </ul>
          </nav>
        </div>
         <div className={styles.header_buttons}>
          {/* {loggedIn && <p onClick={handleSignOut} className="header__logout">Выйти</p>} */}
          <button className={`button ${styles.header__button}`} onClick={() => openPopup(setIsAddGamePopupOpen)}>
            Новая игра &#43;
          </button>
        </div>
      </div>
    </header>
    <AddGameForm isOpen={isAddGamePopupOpen} onClose={()=> closePopup(setIsAddGamePopupOpen)} />
    </>
   
  );
}

export default Header;
