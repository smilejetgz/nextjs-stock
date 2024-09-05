'use client';

import * as React from 'react';
import {
  useGetCategory,
  useRemoveCategory,
} from '@/features/categories/hooks/api';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { Loading, NotFound } from '@/features/ui/components/Status';
import CategoryForm from '@/features/categories/components/CategoryForm';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const RemoveCategory = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategory(+id);
  const { mutateAsync } = useRemoveCategory(+id);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const removeCategory = async () => {
    try {
      await mutateAsync();
      toast({ description: 'Category deleted successfully.' });
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
    <CategoryForm kind="remove" category={category} onSubmit={removeCategory} />
  );
};

export default RemoveCategory;
