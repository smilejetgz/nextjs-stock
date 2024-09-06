import * as z from 'zod';
import { image } from '@/features/shared/validators/image';

export const add = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name cannot be empty'),
  amount: z.number().min(1),
  detail: z
    .string({ required_error: 'Detail is required' })
    .min(1, 'Detail cannot be empty'),
  status: z.enum(['APPROVED', 'REJECTED'], {
    required_error: 'Status is required',
  }),
  CategoryId: z.number({ required_error: 'Category ID is required' }),
  image,
});

export const update = add.partial();
