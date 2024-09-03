import { type ReactNode } from 'react';

interface CategoryPageLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const CategoryPageLayout = ({ children, modal }: CategoryPageLayoutProps) => {
  return (
    <>
      {children}
      {modal}
    </>
  );
};

export default CategoryPageLayout;
