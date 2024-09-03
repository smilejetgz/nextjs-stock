'use client';

import CategoryForm from '@/features/categories/components/CategoryForm';
import {
  useEditCategory,
  useGetCategory,
} from '@/features/categories/hooks/api';
import { type UpdateCategoryInput } from '@/features/categories/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { useParams, useRouter } from 'next/navigation';

const EditCategory = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  console.log('Get', id);
  const { data: category, isLoading } = useGetCategory(+id);
  const { mutateAsync } = useEditCategory(+id);
  const { toast } = useToast();

  const editCategory = async (form: UpdateCategoryInput) => {
    try {
      await mutateAsync(form);
      toast({ description: 'Category updated successfully.' });
      router.push('/categories');
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update category.';
      toast({ description: errorMessage });
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!category) return <div>No leave data found</div>;
  return (
    <CategoryForm
      kind="edit"
      category={category}
      onSubmit={editCategory}
    ></CategoryForm>
  );
};

export default EditCategory;
