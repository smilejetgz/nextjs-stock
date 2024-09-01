import {
  type AddCategoryInput,
  type CategoryDetails,
  type CategoryItem,
} from '@/features/categories/types';
import { type ApiError } from '@/features/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/categories');
      const categories = await (res.json() as Promise<CategoryItem[]>);

      return categories;
    },
  });
};

export const useGetCategory = (id: CategoryDetails['id']) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${id}`);
      const category = await (res.json() as Promise<CategoryDetails>);

      return category;
    },
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (input: AddCategoryInput) => {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errorData = await (res.json() as Promise<ApiError>);
        throw new Error(errorData.error || 'An error occurred');
      }

      return await (res.json() as Promise<Omit<CategoryDetails, 'user'>>);
    },
  });
};
