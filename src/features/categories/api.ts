import { type AddCategoryInput } from '@/features/categories/types';
import db from '@/features/shared/db';

export const findAll = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return categories;
};

export const findById = async (id: number) => {
  const category = await db.category.findUnique({
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

  if (!category) throw new Error('category not fount');
  return category;
};

export const checkCategoryNameExists = async ({
  name,
}: Pick<AddCategoryInput, 'name'>): Promise<boolean> => {
  const categoryWithName = await db.category.findUnique({
    where: { name },
  });
  return !!categoryWithName;
};

export const add = async (userId: number, input: AddCategoryInput) => {
  const category = await db.category.create({
    data: {
      ...input,
      userId,
    },
  });

  return category;
};
