import React, { FC, ReactNode } from 'react';
import styles from '@/styles/Popup.module.scss';

interface PopupProps {
  isOpen: boolean;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ isOpen, children }) => {
  return (
    <aside className={`${styles.popup} ${isOpen && styles.popup_opened}`}>
      {children}
    </aside>
  );
};

export default Popup;
