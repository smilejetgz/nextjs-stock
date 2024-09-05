'use client';

import StockForm from '@/features/stocks/components/StockForm';
import { useEditStock, useGetStock } from '@/features/stocks/hooks/api';
import { type UpdateStockInput } from '@/features/stocks/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { Loading, NotFound } from '@/features/ui/components/Status';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const EditStock = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: stock, isLoading } = useGetStock(+id);
  const { mutateAsync } = useEditStock(+id);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const editStock = async (form: UpdateStockInput) => {
    try {
      await mutateAsync(form);
      toast({ description: 'Stock updated successfully.' });
      queryClient.invalidateQueries({
        queryKey: ['stocks'],
      });
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to update stock.';
      toast({ description: errorMessage });
    }
  };

  if (isLoading)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <Loading label="Loading..." />
      </div>
    );
  if (!stock)
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <NotFound label="No Stock data found." />
      </div>
    );
  return <StockForm kind="edit" stock={stock} onSubmit={editStock}></StockForm>;
};

export default EditStock;
