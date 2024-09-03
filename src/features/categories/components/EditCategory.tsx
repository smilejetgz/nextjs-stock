'use client';

import CategoryForm from '@/features/categories/components/CategoryForm';
import {
  useEditCategory,
  useGetCategory,
} from '@/features/categories/hooks/api';
import { type UpdateCategoryInput } from '@/features/categories/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { Loading, NotFound } from '@/features/ui/components/Status';
import {
  useParams,
  useRouter,
  useSelectedLayoutSegment,
} from 'next/navigation';

const EditCategory = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const test = useSelectedLayoutSegment();
  console.log('Get', test);
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

  if (isLoading) return <Loading label="Loading..." />;
  if (!category) return <NotFound label="No leave data found." />;
  return (
    <CategoryForm
      kind="edit"
      category={category}
      onSubmit={editCategory}
    ></CategoryForm>
  );
};

export default EditCategory;
