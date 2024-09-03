import CategoryDetails from '@/features/categories/components/CategoryDetails';
import CreateCategory from '@/features/categories/components/CreateCategory';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface CategoryDialogPageProps {
  params: {
    id: string;
  };
}

const CategoryDialogPage = ({ params: { id } }: CategoryDialogPageProps) => {
  return (
    <InterceptDialog>
      {id === 'add' ? (
        <CreateCategory></CreateCategory>
      ) : (
        <CategoryDetails></CategoryDetails>
      )}
    </InterceptDialog>
  );
};

export default CategoryDialogPage;
