import {
  type StockCountStatus,
  type StockCountByCategory,
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
