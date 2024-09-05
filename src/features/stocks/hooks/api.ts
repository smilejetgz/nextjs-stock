import {
  type UpdateStockInput,
  type AddStockInput,
  type StockDetails,
  type StockItem,
} from '@/features/stocks/types';
import { type ApiError } from '@/features/shared/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetStocks = () => {
  return useQuery({
    queryKey: ['stocks'],
    queryFn: async () => {
      const res = await fetch('/api/stocks');
      const stocks = await (res.json() as Promise<StockItem[]>);

      return stocks;
    },
  });
};

export const useGetStock = (id: StockDetails['id']) => {
  return useQuery({
    queryKey: ['stock', id],
    queryFn: async () => {
      const res = await fetch(`/api/stocks/${id}`);
      const stock = await (res.json() as Promise<StockDetails>);

      return stock;
    },
  });
};

export const useCreateStock = () => {
  return useMutation({
    mutationFn: async (input: AddStockInput) => {
      const res = await fetch('/api/stocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errorData = await (res.json() as Promise<ApiError>);
        throw new Error(errorData.error || 'An error occurred');
      }

      return await (res.json() as Promise<Omit<StockDetails, 'user'>>);
    },
  });
};

export const useEditStock = (id: StockDetails['id']) => {
  return useMutation({
    mutationFn: async (input: UpdateStockInput) => {
      const res = await fetch(`/api/stocks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const errorData = await (res.json() as Promise<ApiError>);
        throw new Error(errorData.error || 'An error occurred');
      }

      return await (res.json() as Promise<Omit<StockDetails, 'user'>>);
    },
  });
};

export const useRemoveStock = (id: StockDetails['id']) => {
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/stocks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const errorData = await (res.json() as Promise<ApiError>);
        throw new Error(errorData.error || 'An error occurred');
      }

      return await (res.json() as Promise<Omit<StockDetails, 'user'>>);
    },
  });
};
