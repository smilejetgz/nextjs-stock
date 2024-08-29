import { type findAll } from '@/features/categories/api';

export type CategoryItem = Awaited<ReturnType<typeof findAll>>[number];
