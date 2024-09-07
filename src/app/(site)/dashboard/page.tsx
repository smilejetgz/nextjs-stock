'use client';

import {
  CardUserCount,
  CardCategoryCount,
  CardStockCount,
  CardStockCountStatus,
} from '@/features/dashboard/Cards';
import {
  ChartStockCountStatus,
  ChartStockCountByCategory,
} from '@/features/dashboard/Charts';
import {
  TableNewCategory,
  TableNewStock,
  TableNewUsers,
} from '@/features/dashboard/Tables';

const DashboardPage = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <CardUserCount />
      <CardCategoryCount />
      <CardStockCount />
      <CardStockCountStatus />
      <TableNewCategory />
      <ChartStockCountByCategory />
      <ChartStockCountStatus />
      <TableNewUsers />
      <TableNewStock />
    </div>
  );
};

export default DashboardPage;
