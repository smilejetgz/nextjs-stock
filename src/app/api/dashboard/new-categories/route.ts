import { NewCategories } from '@/features/dashboard/api';

export const GET = async () => {
  const newCategories = await NewCategories();
  return Response.json(newCategories);
};
