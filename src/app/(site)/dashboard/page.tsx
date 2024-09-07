import {
  ChartStockCountByCategory,
  ChartStockCountStatus,
} from '@/features/dashboard/Chart';

const DashboardPage = () => {
  return (
    <>
      <ChartStockCountByCategory />
      <ChartStockCountStatus />
    </>
  );
};

export default DashboardPage;
