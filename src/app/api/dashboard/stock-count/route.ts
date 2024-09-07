import { StockCount } from '@/features/dashboard/api';

export const GET = async () => {
  const stockCount = await StockCount();
  return Response.json(stockCount);
};
