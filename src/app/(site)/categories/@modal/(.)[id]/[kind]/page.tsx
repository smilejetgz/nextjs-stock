'use client';

import EditCategory from '@/features/categories/components/EditCategory';
import RemoveCategory from '@/features/categories/components/RemoveCategory';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface InterceptCategoryPageProps {
  params: {
    kind: string;
  };
}

const InterceptCategoryPage = ({
  params: { kind },
}: InterceptCategoryPageProps) => {
  return (
    <InterceptDialog>
      {kind === 'edit' ? (
        <EditCategory />
      ) : kind === 'delete' ? (
        <RemoveCategory />
      ) : null}
    </InterceptDialog>
  );
};

export default InterceptCategoryPage;
