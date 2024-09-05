import * as z from 'zod';

export const add = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name cannot be empty'),
  amount: z
    .number({ required_error: 'Amount is required' })
    .min(1, 'Amount must be at least 1'),
  detail: z
    .string({ required_error: 'Detail is required' })
    .min(1, 'Detail cannot be empty'),
  status: z.enum(['APPROVED', 'REJECTED'], {
    required_error: 'Status is required',
  }),
  CategoryId: z.number({ required_error: 'Category ID is required' }), // ใช้ CategoryId
});

export const update = add.partial();
