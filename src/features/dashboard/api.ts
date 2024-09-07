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

  return stockCountByCategory.map((category) => ({
    category: category.name,
    stock: Number(category._count.Stock),
  }));
};

export const StockCountStatus = async () => {
  const stockStatusCount = await db.stock.groupBy({
    by: ['status'],
    _count: {
      status: true,
    },
  });

  return stockStatusCount.map((stock) => ({
    key: stock.status,
    value: Number(stock._count.status),
  }));
};
