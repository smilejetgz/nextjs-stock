import type * as api from '@/features/categories/api';
import { type update, type add } from '@/features/categories/validators';
import type * as z from 'zod';

export type CategoryItem = Awaited<ReturnType<typeof api.findAll>>[number];

export type CategoryDetails = Awaited<ReturnType<typeof api.findById>>;

export type AddCategoryInput = z.infer<typeof add>;

export type UpdateCategoryInput = z.infer<typeof update>;
