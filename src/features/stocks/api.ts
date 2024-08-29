import db from '@/features/shared/db';

export const findAll = async () => {
  const stocks = await db.stock.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return stocks;
};
