'use client';

import * as React from 'react';
import { useGetStock, useRemoveStock } from '@/features/stocks/hooks/api';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { Loading, NotFound } from '@/features/ui/components/Status';
import StockForm from '@/features/stocks/components/StockForm';
import { useParams, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

const RemoveStock = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: stock, isLoading } = useGetStock(+id);
  const { mutateAsync } = useRemoveStock(+id);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const removeStock = async () => {
    try {
      await mutateAsync();
      toast({ description: 'Stock deleted successfully.' });
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
  return <StockForm kind="remove" stock={stock} onSubmit={removeStock} />;
};

export default RemoveStock;
