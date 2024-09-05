'use client';

import StockForm from '@/features/stocks/components/StockForm';
import { useCreateStock } from '@/features/stocks/hooks/api';
import { type AddStockInput } from '@/features/stocks/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const CreateStock = () => {
  const router = useRouter();
  const { mutateAsync } = useCreateStock();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createStock = async (form: AddStockInput) => {
    try {
      await mutateAsync(form);
      toast({ description: 'Stock created successfully.' });
      queryClient.invalidateQueries({
        queryKey: ['stocks'],
      });
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create stock.';
      toast({ description: errorMessage });
    }
  };

  return <StockForm kind="create" onSubmit={createStock}></StockForm>;
};

export default CreateStock;
