import React from 'react';
import Header from './Header';

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      <main className='main'>{props.children}</main>
    </>
  );
};

export default Layout;
