import {
  type StockCountStatus,
  type StockCountByCategory,
  type UserCount,
  type CategoryCount,
  type StockCount,
} from '@/features/dashboard/type';
import { useQuery } from '@tanstack/react-query';

export const useGetStockCountByCategory = () => {
  return useQuery({
    queryKey: ['stockCountByCategory '],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stock-count-by-category');
      const stockCountByCategory = await (res.json() as Promise<
        StockCountByCategory[]
      >);

      return stockCountByCategory;
    },
  });
};

export const useGetStockCountStatus = () => {
  return useQuery({
    queryKey: ['stockCountStatus'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stock-count-status');
      const stockCountStatus = await (res.json() as Promise<
        StockCountStatus[]
      >);

      return stockCountStatus;
    },
  });
};

export const useGetUserCount = () => {
  return useQuery({
    queryKey: ['stockCount'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/user-count');
      const userCount = await (res.json() as Promise<UserCount>);

      return userCount;
    },
  });
};

export const useGetCategoryCount = () => {
  return useQuery({
    queryKey: ['categoryCount'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/category-count');
      const categoryCount = await (res.json() as Promise<CategoryCount>);

      return categoryCount;
    },
  });
};

export const useGetStockCount = () => {
  return useQuery({
    queryKey: ['stockCount'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stock-count');
      const stockCount = await (res.json() as Promise<StockCount>);

      return stockCount;
    },
  });
};
