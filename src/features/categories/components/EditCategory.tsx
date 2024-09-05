'use client';

import CategoryForm from '@/features/categories/components/CategoryForm';
import {
  useEditCategory,
  useGetCategory,
} from '@/features/categories/hooks/api';
import { type UpdateCategoryInput } from '@/features/categories/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { Loading, NotFound } from '@/features/ui/components/Status';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const EditCategory = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategory(+id);
  const { mutateAsync } = useEditCategory(+id);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const editCategory = async (form: UpdateCategoryInput) => {
    try {
      await mutateAsync(form);
      toast({ description: 'Category updated successfully.' });
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update category.';
      toast({ description: errorMessage });
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading label="Loading..." />
      </div>
    );
  if (!category)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <NotFound label="No Category data found." />
      </div>
    );
  return (
    <CategoryForm
      kind="edit"
      category={category}
      onSubmit={editCategory}
    ></CategoryForm>
  );
};

export default EditCategory;
