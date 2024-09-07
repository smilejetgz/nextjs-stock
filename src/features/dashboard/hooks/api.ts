import {
  type StockCountStatus,
  type StockCountByCategory,
  type UserCount,
  type CategoryCount,
  type StockCount,
  type NewStocks,
  type NewCategories,
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
    queryKey: ['userCount'],
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

export const useGetNewUsers = () => {
  return useQuery({
    queryKey: ['newUsers'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/new-users');
      const newUsers = await (res.json() as Promise<NewStocks>);

      return newUsers;
    },
  });
};

export const useGetNewCategories = () => {
  return useQuery({
    queryKey: ['newCategories'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/new-categories');
      const newCategories = await (res.json() as Promise<NewCategories>);

      return newCategories;
    },
  });
};

export const useGetNewStocks = () => {
  return useQuery({
    queryKey: ['newStocks'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/new-stocks');
      const newStocks = await (res.json() as Promise<NewStocks>);

      return newStocks;
    },
  });
};
