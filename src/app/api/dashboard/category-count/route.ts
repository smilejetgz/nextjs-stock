import { CategoryCount } from '@/features/dashboard/api';

export const GET = async () => {
  const categoryCount = await CategoryCount();
  return Response.json(categoryCount);
};
