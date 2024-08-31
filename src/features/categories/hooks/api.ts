import {
  type CategoryDetail,
  type CategoryItem,
} from '@/features/categories/types';
import { useQuery } from '@tanstack/react-query';

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

export const useGetCategory = (id: CategoryDetail['id']) => {
  return useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const res = await fetch(`/api/categories/${id}`);
      const category = await (res.json() as Promise<CategoryDetail>);

      return category;
    },
  });
};
