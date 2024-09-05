import { getServerAuthSession } from '@/features/auth/auth';
import { type UpdateStockInput } from '@/features/stocks/types';
import * as validators from '@/features/stocks/validators';
import * as api from '@/features/stocks/api';

interface PathParams {
  params: {
    id: string;
  };
}

export const GET = async (_req: Request, { params: { id } }: PathParams) => {
  const stock = await api.findById(+id);

  return Response.json(stock);
};

export const PATCH = async (req: Request, { params: { id } }: PathParams) => {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Please login' }), {
      status: 401,
    });
  }

  const body = await (req.json() as Promise<UpdateStockInput>);

  try {
    const form = await validators.update.parseAsync(body);

    const isStockNameTaken = await api.checkStockNameExists({
      name: form.name,
      id: +id,
    });
    if (isStockNameTaken) {
      return new Response(
        JSON.stringify({ error: 'Stock name already taken' }),
        {
          status: 409,
        },
      );
    }

    const stock = await api.update(+id, form);
    return new Response(JSON.stringify(stock));
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
    const stock = await api.remove(+id);
    return new Response(JSON.stringify(stock));
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
};
