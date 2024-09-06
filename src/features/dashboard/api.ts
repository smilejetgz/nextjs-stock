import db from '@/features/shared/db';

export const StockCountByCategory = async () => {
  const stockCountByCategory = await db.category.findMany({
    select: {
      name: true,
      _count: {
        select: { Stock: true },
      },
    },
  });

  return stockCountByCategory
    .map((category) => ({
      name: category.name,
      Stock: Number(category._count.Stock),
    }))
    .sort((a, b) => b.Stock - a.Stock);
};
