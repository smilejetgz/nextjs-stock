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
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getImagePath } from '@/features/shared/helpers/upload';

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
        <CardContent className="text-left">
          <div className="flex justify-center">
            <Image
              alt="Product image"
              className="aspect-square rounded-md object-cover"
              height="124"
              src={getImagePath(String(stock.image))}
              width="124"
            />
          </div>
          <Separator className="my-4" />
          <p>
            <strong>Name:</strong>
            {` ${stock.name}`}
          </p>
          <p>
            <strong>Category:</strong>
            {` ${stock.category.name}`}
          </p>
          <p>
            <strong>Amount:</strong>
            {` ${stock.amount}`}
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
          <strong>Detail:</strong>
          <ScrollArea className="h-[150px] rounded-md border p-2">
            <div>{` ${stock.detail}`}</div>
          </ScrollArea>
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
