import * as z from 'zod';

export const add = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name cannot be empty'),
});

export const update = add.partial();
