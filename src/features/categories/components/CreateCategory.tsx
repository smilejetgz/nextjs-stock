'use client';

import CategoryForm from '@/features/categories/components/CategoryForm';
import { useCreateCategory } from '@/features/categories/hooks/api';
import { type AddCategoryInput } from '@/features/categories/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const CreateCategory = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateCategory();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createCategory = async (form: AddCategoryInput) => {
    try {
      await mutateAsync(form);
      toast({ description: 'Category created successfully.' });
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create category.';
      toast({ description: errorMessage });
    }
  };

  return <CategoryForm kind="create" onSubmit={createCategory}></CategoryForm>;
};

export default CreateCategory;
