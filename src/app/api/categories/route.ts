import { findAll } from '@/features/categories/api';

export const GET = async () => {
  const categories = await findAll();
  return Response.json(categories);
};
