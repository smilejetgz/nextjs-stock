import { type findAll } from '@/features/users/api';

export type UserItem = Awaited<ReturnType<typeof findAll>>[number];
