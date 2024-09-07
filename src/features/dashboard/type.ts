import {
  type StockCountStatus,
  type StockCountByCategory,
  type UserCount,
  type CategoryCount,
  type StockCount,
} from '@/features/dashboard/api';

export type StockCountByCategory = Awaited<
  ReturnType<typeof StockCountByCategory>
>[number];

export type StockCountStatus = Awaited<
  ReturnType<typeof StockCountStatus>
>[number];

export type UserCount = Awaited<ReturnType<typeof UserCount>>;

export type CategoryCount = Awaited<ReturnType<typeof CategoryCount>>;

export type StockCount = Awaited<ReturnType<typeof StockCount>>;
