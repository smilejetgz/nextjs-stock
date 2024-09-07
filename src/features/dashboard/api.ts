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

export const UserCount = async () => {
  const userCount = await db.user.count();
  console.log(userCount);
  return userCount;
};

export const StockCount = async () => {
  const stockCount = await db.stock.count();

  return stockCount;
};

export const CategoryCount = async () => {
  const categoryCount = await db.category.count();

  return categoryCount;
};

export const NewUsers = async () => {
  const newUsers = await db.user.findMany({
    select: { name: true, email: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return newUsers;
};

export const NewCategories = async () => {
  const newCategories = await db.category.findMany({
    select: { name: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return newCategories;
};

export const NewStocks = async () => {
  const newStocks = await db.stock.findMany({
    select: { image: true, name: true, amount: true },
    orderBy: { createdAt: 'desc' },
    take: 10,
  });

  return newStocks;
};
