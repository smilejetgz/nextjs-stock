'use client';

import {
  useGetUserCount,
  useGetCategoryCount,
  useGetStockCount,
  useGetStockCountStatus,
} from '@/features/dashboard/hooks/api';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/features/shadcn/components/ui/card';
import { Loading, NotFound } from '@/features/ui/components/Status';
import { EyeOff, Package, Tag, Users } from 'lucide-react';

export const CardUserCount = () => {
  const { data: userCount, isLoading: isLoadingUserCount } = useGetUserCount();

  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">User</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoadingUserCount ? (
            <Loading label="Loading..." />
          ) : !userCount ? (
            <NotFound label="User not found." />
          ) : (
            userCount
          )}
        </div>
        <p className="text-xs text-muted-foreground">Amount User</p>
      </CardContent>
    </Card>
  );
};

export const CardCategoryCount = () => {
  const { data: categoryCount, isLoading: isLoadingCategoryCount } =
    useGetCategoryCount();

  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Category</CardTitle>
        <Tag className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoadingCategoryCount ? (
            <Loading label="Loading..." />
          ) : !categoryCount ? (
            <NotFound label="User not found." />
          ) : (
            categoryCount
          )}
        </div>
        <p className="text-xs text-muted-foreground">Amount Category</p>
      </CardContent>
    </Card>
  );
};

export const CardStockCount = () => {
  const { data: stockCount, isLoading: isLoadingStockCount } =
    useGetStockCount();

  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Stock</CardTitle>
        <Package className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoadingStockCount ? (
            <Loading label="Loading..." />
          ) : !stockCount ? (
            <NotFound label="User not found." />
          ) : (
            stockCount
          )}
        </div>
        <p className="text-xs text-muted-foreground">Amount Stock</p>
      </CardContent>
    </Card>
  );
};

export const CardStockCountStatus = () => {
  const { data: stockCountStatus, isLoading: isLoadingStockCountStatus } =
    useGetStockCountStatus();

  return (
    <Card x-chunk="dashboard-01-chunk-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Stock</CardTitle>
        <EyeOff className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {isLoadingStockCountStatus ? (
            <Loading label="Loading..." />
          ) : !stockCountStatus || stockCountStatus === undefined ? (
            <NotFound label="User not found." />
          ) : (
            <div className="flex gap-12">
              {Array.isArray(stockCountStatus) ? (
                stockCountStatus.map((item, index) => (
                  <div key={index}>
                    {item.value}
                    <p className="text-xs text-muted-foreground">{item.key}</p>
                  </div>
                ))
              ) : (
                <div>Invalid data format.</div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
