import {
  type AddStockInput,
  type UpdateStockInput,
  type StockDetails,
} from '@/features/stocks/types';
import db from '@/features/shared/db';
import { removeDirFromFile, saveFile } from '@/features/shared/helpers/file';

export const findAll = async () => {
  const stocks = await db.stock.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
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
      category: {
        select: {
          id: true,
          name: true,
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

export const update = async (id: number, input: UpdateStockInput) => {
  let { image: existingImage } = await findById(id);

  if (input.image) {
    const currentImage = existingImage;
    existingImage = await saveFile(input.image);
    if (currentImage) {
      await removeDirFromFile(currentImage);
    }
  }

  const stock = await db.stock.update({
    where: { id },
    data: {
      ...input,
      image: existingImage,
    },
  });

  return stock;
};

export const add = async (userId: number, input: AddStockInput) => {
  let image = null;
  if (input.image) image = await saveFile(input.image);

  const stock = await db.stock.create({
    data: {
      ...input,
      image,
      userId,
    },
  });

  return stock;
};

export const remove = async (stockId: number) => {
  const { image: stockImage } = await findById(stockId);
  if (stockImage) {
    await removeDirFromFile(stockImage);
  }

  const stock = await db.stock.delete({
    where: { id: stockId },
  });

  return stock;
};
