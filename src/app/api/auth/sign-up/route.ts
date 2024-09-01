import { type Signup } from '@/features/auth/types';
import { signup } from '@/features/auth/validators';
import {
  add,
  checkUserNameExists,
  checkUserEmailExists,
} from '@/features/users/api';

export const POST = async (req: Request) => {
  const body = await (req.json() as Promise<Signup>);

  try {
    const credentials = await signup.parseAsync(body);

    const isNameTaken = await checkUserNameExists({ name: credentials.name });
    if (isNameTaken) {
      return new Response(JSON.stringify({ error: 'Name already taken' }), {
        status: 409,
      });
    }

    const isEmailTaken = await checkUserEmailExists({
      email: credentials.email,
    });
    if (isEmailTaken) {
      return new Response(
        JSON.stringify({ error: 'Email already registered' }),
        { status: 409 },
      );
    }

    const profile = await add(credentials);

    return new Response(JSON.stringify(profile), { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Registration failed. Please try again.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
};
