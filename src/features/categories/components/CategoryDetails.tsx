'use client';

import { useGetCategory } from '@/features/categories/hooks/api';
import { Button } from '@/features/shadcn/components/ui/button';
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
import { Loading, NotFound } from '@/features/ui/components/Status';
import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const CategoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategory(+id);

  return (
    <Card className="sm:col-span-full" x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <div className="flex items-center">
          <div className="flex-col">
            <CardTitle>Category Details</CardTitle>
            <CardDescription className="mt-2">ID: {id}</CardDescription>
          </div>
          <div className="ml-auto flex justify-items-end gap-2">
            <Button size="sm">
              <Link href="/categories" className="flex h-7 items-center gap-1">
                <ArrowLeftToLine className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Categories
                </span>
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
      </CardHeader>
      {isLoading ? (
        <Loading label="Loading category details..." />
      ) : !category ? (
        <NotFound label="Category not found" />
      ) : (
        <CardContent>
          <p>
            <strong>Name:</strong> {category.name}
          </p>
          <p>
            <strong>Created by:</strong> {category.user.name} (
            {category.user.email})
          </p>
          <p>
            <strong>Created on:</strong> {toDateString(category.createdAt)}
          </p>
          <p>
            <strong>Last modified:</strong> {toDateString(category.updatedAt)}
          </p>
        </CardContent>
      )}
      <CardFooter>
        <div className="text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
};

export default CategoryDetails;
