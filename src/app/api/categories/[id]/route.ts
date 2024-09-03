import { getServerAuthSession } from '@/features/auth/auth';
import { type UpdateCategoryInput } from '@/features/categories/types';
import * as validators from '@/features/categories/validators';
import * as api from '@/features/categories/api';

interface PathParams {
  params: {
    id: string;
  };
}

export const GET = async (_req: Request, { params: { id } }: PathParams) => {
  const category = await api.findById(+id);

  return Response.json(category);
};

export const PATCH = async (req: Request, { params: { id } }: PathParams) => {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Please login' }), {
      status: 401,
    });
  }

  const body = await (req.json() as Promise<UpdateCategoryInput>);

  try {
    const form = await validators.update.parseAsync(body);

    const isCategoryNameTaken = await api.checkCategoryNameExists({
      name: form.name,
      id: +id,
    });
    if (isCategoryNameTaken) {
      return new Response(
        JSON.stringify({ error: 'Category name already taken' }),
        {
          status: 409,
        },
      );
    }

    const category = await api.update(+id, form);
    return new Response(JSON.stringify(category));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
};

export const DELETE = async (_req: Request, { params: { id } }: PathParams) => {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Please login' }), {
      status: 401,
    });
  }
  try {
    const category = await api.remove(+id);
    return new Response(JSON.stringify(category));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
};
