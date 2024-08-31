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
