'use client';

import { type ReactNode } from 'react';

interface StocksLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const StocksLayout = ({ children, modal }: StocksLayoutProps) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default StocksLayout;
