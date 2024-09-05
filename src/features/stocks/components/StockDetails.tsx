'use client';

import { useGetStock } from '@/features/stocks/hooks/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { toDateString } from '@/features/shared/helpers/date';
import { ButtonBack } from '@/features/ui/components/Buttons';
import { Loading, NotFound } from '@/features/ui/components/Status';
import { useParams } from 'next/navigation';

const StockDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: stock, isLoading } = useGetStock(+id);

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Stock Details</CardTitle>
        <CardDescription className="mt-2">ID: {id}</CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      {isLoading ? (
        <Loading label="Loading stock details..." />
      ) : !stock ? (
        <NotFound label="Stock not found" />
      ) : (
        <CardContent>
          <p>
            <strong>Name:</strong>
            {` ${stock.name}`}
          </p>
          <p>
            <strong>Created by:</strong>
            {` ${stock.user.name}, ${stock.user.email}`}
          </p>
          <p>
            <strong>Created on:</strong>
            {` ${toDateString(stock.createdAt)}`}
          </p>
          <p>
            <strong>Last modified:</strong>
            {` ${toDateString(stock.updatedAt)}`}
          </p>
        </CardContent>
      )}
      <CardFooter>
        <div className="flex justify-start">
          <ButtonBack />
        </div>
      </CardFooter>
    </Card>
  );
};

export default StockDetails;
