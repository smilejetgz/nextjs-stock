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
  TableNewUser,
} from '@/features/dashboard/Tables';

const DashboardPage = () => {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <CardUserCount />
        <CardCategoryCount />
        <CardStockCount />
        <CardStockCountStatus />
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <TableNewUser />
        <ChartStockCountByCategory />
      </div>
      <div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <TableNewCategory />
          <ChartStockCountStatus />
        </div>
      </div>
      <TableNewStock />
    </>
  );
};

export default DashboardPage;
