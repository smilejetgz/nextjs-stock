'use client';

import { type ReactNode } from 'react';

interface CategoriesLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const CategoriesLayout = ({ children, modal }: CategoriesLayoutProps) => {
  return (
    <>
      {modal}
      {children}
    </>
  );
};

export default CategoriesLayout;
