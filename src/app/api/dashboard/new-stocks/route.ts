import { NewStocks } from '@/features/dashboard/api';

export const GET = async () => {
  const newStocks = await NewStocks();
  return Response.json(newStocks);
};
