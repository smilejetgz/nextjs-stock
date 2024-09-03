import { findAll } from '@/features/categories/api';
import { getServerAuthSession } from '@/features/auth/auth';
import { type AddCategoryInput } from '@/features/categories/types';
import * as validators from '@/features/categories/validators';
import * as api from '@/features/categories/api';

export const GET = async () => {
  const categories = await findAll();
  return Response.json(categories);
};

export const POST = async (req: Request) => {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Please login' }), {
      status: 401,
    });
  }

  const body = await (req.json() as Promise<AddCategoryInput>);

  try {
    const form = await validators.add.parseAsync(body);

    const isNameTaken = await api.checkCategoryNameExists({ name: form.name });
    if (isNameTaken) {
      return new Response(
        JSON.stringify({ error: 'Category name already taken' }),
        {
          status: 409,
        },
      );
    }

    const category = await api.add(+session.user.id, form);

    return new Response(JSON.stringify(category), { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
};
