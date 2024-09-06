import { type StockCountByCategory } from '@/features/dashboard/type';
import { useQuery } from '@tanstack/react-query';

export const useGetStockCountByCategory = () => {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: async () => {
      const res = await fetch('/api/dashboard/stock-count-by-category');
      const stockCountByCategory = await (res.json() as Promise<
        StockCountByCategory[]
      >);

      return stockCountByCategory;
    },
  });
};
