import { findAll } from '@/features/stocks/api';

export const GET = async () => {
  const stocks = await findAll();
  return Response.json(stocks);
};
