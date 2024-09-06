import { StockCountByCategory } from '@/features/dashboard/api';

export const GET = async () => {
  const categories = await StockCountByCategory();
  return Response.json(categories);
};
