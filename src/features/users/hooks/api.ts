import { type UserItem } from '@/features/users/types';
import { useQuery } from '@tanstack/react-query';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('/api/users');
      const users = await (res.json() as Promise<UserItem[]>);

      return users;
    },
  });
};
