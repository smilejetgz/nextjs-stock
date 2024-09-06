import { type StockCountByCategory } from '@/features/dashboard/api';

export type StockCountByCategory = Awaited<
  ReturnType<typeof StockCountByCategory>
>[number];
