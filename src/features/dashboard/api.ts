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

export const NewCategories = async () => {
  const newCategories = await db.category.findMany({
    select: { name: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return newCategories;
};

export const NewUsers = async () => {
  const newUsers = await db.user.findMany({
    select: {
      name: true,
      image: true,
      role: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 7,
  });

  return newUsers;
};

export const NewStocks = async () => {
  const newStocks = await db.stock.findMany({
    select: { name: true, image: true, amount: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return newStocks;
};
