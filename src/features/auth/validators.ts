import * as z from 'zod';
import { image } from '@/features/shared/validators/image';

export const signin = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/\d/, { message: 'Password must contain at least one number' })
    .regex(/[@$!%*?&#.]/, {
      message: 'Password must contain at least one special character',
    }),
});

export const signup = signin.extend({
  name: z.string(),
});

export const profile = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.preprocess(
    (v) => (v === '' ? undefined : v),
    z.string().min(8).optional(),
  ),
  image: image.optional(),
});
