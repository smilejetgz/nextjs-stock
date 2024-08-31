import type * as api from '@/features/categories/api';

export type CategoryItem = Awaited<ReturnType<typeof api.findAll>>[number];

export type CategoryDetail = Awaited<ReturnType<typeof api.findById>>;
