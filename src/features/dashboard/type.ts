import {
  type StockCountStatus,
  type StockCountByCategory,
  type UserCount,
  type CategoryCount,
  type StockCount,
  type NewUsers,
  type NewCategories,
  type NewStocks,
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

export type NewUsers = Awaited<ReturnType<typeof NewUsers>>;

export type NewCategories = Awaited<ReturnType<typeof NewCategories>>;

export type NewStocks = Awaited<ReturnType<typeof NewStocks>>;
