import { findAll } from '@/features/users/api';

export const GET = async () => {
  const users = await findAll();
  return Response.json(users);
};
