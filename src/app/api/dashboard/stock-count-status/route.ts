import { StockCountStatus } from '@/features/dashboard/api';

export const GET = async () => {
  const status = await StockCountStatus();
  return Response.json(status);
};
