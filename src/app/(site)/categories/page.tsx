'use client';

import CategoryList from '@/features/categories/components/CategoryList';
import { useGetCategories } from '@/features/categories/hooks/api';
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

const CategoryPage = () => {
  const { data, status } = useGetCategories();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <div className="flex items-center">
          <div className="flex-col">
            <CardTitle>Categories</CardTitle>
            <CardDescription className="mt-2">
              Manage your categories.
            </CardDescription>
          </div>
          <div className="ml-auto flex justify-items-end gap-2">
            <Button size="sm">
              <Link
                href="categories/add"
                className="flex h-7 items-center gap-1"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Category
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
          <NotFound label="No categories found" />
        ) : (
          <CategoryList categories={data} />
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

export default CategoryPage;
