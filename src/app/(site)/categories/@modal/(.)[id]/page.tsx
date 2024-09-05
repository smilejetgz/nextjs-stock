'use client';

import CategoryDetails from '@/features/categories/components/CategoryDetails';
import CreateCategory from '@/features/categories/components/CreateCategory';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface InterceptCategoryPageProps {
  params: {
    id: string;
  };
}

const InterceptCategoryPage = ({
  params: { id },
}: InterceptCategoryPageProps) => {
  return (
    <InterceptDialog>
      {id === 'add' ? <CreateCategory /> : <CategoryDetails />}
    </InterceptDialog>
  );
};

export default InterceptCategoryPage;
