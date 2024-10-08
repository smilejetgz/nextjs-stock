import { findAll } from '@/features/stocks/api';
import { getServerAuthSession } from '@/features/auth/auth';
import { type AddStockInput } from '@/features/stocks/types';
// import * as validators from '@/features/stocks/validators';
import * as api from '@/features/stocks/api';

export const GET = async () => {
  const stocks = await findAll();
  return Response.json(stocks);
};

export const POST = async (req: Request) => {
  const session = await getServerAuthSession();
  if (!session) {
    return new Response(JSON.stringify({ error: 'Please login' }), {
      status: 401,
    });
  }

  try {
    const formData = await req.formData();
    const form = {
      name: formData.get('name'),
      amount: Number(formData.get('amount')),
      detail: formData.get('detail'),
      image: formData.get('image'),
      status: formData.get('status'),
      CategoryId: Number(formData.get('CategoryId')),
    } as AddStockInput;

    const stock = await api.add(+session.user.id, form);
    console.log(stock);

    return new Response(JSON.stringify(stock), { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'An unexpected error occurred.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 422,
    });
  }
};
