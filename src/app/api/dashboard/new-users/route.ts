import { NewUsers } from '@/features/dashboard/api';

export const GET = async () => {
  const newUsers = await NewUsers();
  return Response.json(newUsers);
};
