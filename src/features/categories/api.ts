import {
  type AddCategoryInput,
  type UpdateCategoryInput,
  type CategoryDetails,
} from '@/features/categories/types';
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
  id,
}: Partial<Pick<CategoryDetails, 'name'>> &
  Partial<Pick<CategoryDetails, 'id'>>): Promise<boolean> => {
  const categoryWithName = await db.category.findUnique({
    where: {
      name,
      ...(id && { NOT: { id } }),
    },
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

export const update = async (
  categoryId: number,
  input: UpdateCategoryInput,
) => {
  const category = await db.category.update({
    where: { id: categoryId },
    data: {
      ...input,
    },
  });

  return category;
};

export const remove = async (categoryId: number) => {
  const category = await db.category.delete({
    where: { id: categoryId },
  });

  return category;
};
