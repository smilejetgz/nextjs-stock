'use client';

import StockList from '@/features/stocks/components/StockList';
import { useGetStocks } from '@/features/stocks/hooks/api';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import { Loading, NotFound } from '@/features/ui/components/Status';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

const StockPage = () => {
  const { data, status } = useGetStocks();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="flex-col">
            <CardTitle>Stocks</CardTitle>
            <CardDescription className="mt-2">
              Manage your stocks.
            </CardDescription>
          </div>
          <div className="ml-auto flex justify-items-end gap-2">
            <Button size="sm">
              <Link href="stocks/add" className="flex h-7 items-center gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Stock
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {status === 'pending' ? (
          <Loading label="loading..." />
        ) : !data ? (
          <NotFound label="No stocks found" />
        ) : (
          <StockList stocks={data} />
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {/* Showing <strong>1-10</strong> of <strong>32</strong> products */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default StockPage;
