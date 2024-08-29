import { type CategoryItem } from '@/features/categories/types';
import { useEffect, useState } from 'react';

export const useGetCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  const fetchCategories = async () => {
    const res = await fetch('/api/categories');
    const categories = await (res.json() as Promise<CategoryItem[]>);

    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return categories;
};
