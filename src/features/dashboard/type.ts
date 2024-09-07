import {
  type StockCountStatus,
  type StockCountByCategory,
} from '@/features/dashboard/api';

export type StockCountByCategory = Awaited<
  ReturnType<typeof StockCountByCategory>
>[number];

export type StockCountStatus = Awaited<
  ReturnType<typeof StockCountStatus>
>[number];
