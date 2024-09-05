import type * as api from '@/features/stocks/api';
import { type update, type add } from '@/features/stocks/validators';
import type * as z from 'zod';

export type StockItem = Awaited<ReturnType<typeof api.findAll>>[number];

export type StockDetails = Awaited<ReturnType<typeof api.findById>>;

export type AddStockInput = z.infer<typeof add>;

export type UpdateStockInput = z.infer<typeof update>;
