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
      user: true,
    },
  });

  if (!category) throw new Error('category not fount');
  return category;
};
