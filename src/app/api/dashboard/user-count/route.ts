import { UserCount } from '@/features/dashboard/api';

export const GET = async () => {
  const userCount = await UserCount();
  return Response.json(userCount);
};
