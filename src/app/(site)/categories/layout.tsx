import { type ReactNode } from 'react';

interface HomeLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const CategoryLayout = ({ children, modal }: HomeLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default CategoryLayout;
