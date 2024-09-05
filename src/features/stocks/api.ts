import {
  type AddStockInput,
  type UpdateStockInput,
  type StockDetails,
} from '@/features/stocks/types';
import db from '@/features/shared/db';

export const findAll = async () => {
  const stocks = await db.stock.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return stocks;
};

export const findById = async (id: number) => {
  const stock = await db.stock.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (!stock) throw new Error('stock not fount');
  return stock;
};

export const checkStockNameExists = async ({
  name,
  id,
}: Partial<Pick<StockDetails, 'name'>> &
  Partial<Pick<StockDetails, 'id'>>): Promise<boolean> => {
  const stockWithName = await db.stock.findUnique({
    where: {
      name,
      ...(id && { NOT: { id } }),
    },
  });
  return !!stockWithName;
};

export const add = async (userId: number, input: AddStockInput) => {
  const stock = await db.stock.create({
    data: {
      ...input,
      userId,
    },
  });

  return stock;
};

export const update = async (stockId: number, input: UpdateStockInput) => {
  const stock = await db.stock.update({
    where: { id: stockId },
    data: {
      ...input,
    },
  });

  return stock;
};

export const remove = async (stockId: number) => {
  const stock = await db.stock.delete({
    where: { id: stockId },
  });

  return stock;
};
