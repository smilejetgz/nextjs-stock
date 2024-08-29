import db from '@/features/shared/db';

export const findAll = async () => {
  const categories = await db.category.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return categories;
};
