'use client';

import CategoryList from '@/features/categories/components/CategoryList';
import { useGetCategories } from '@/features/categories/hook/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';

const CategoryPage = () => {
  const categories = useGetCategories();

  return (
    <Card className="sm:col-span-full" x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Manage your categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <CategoryList categories={categories} />
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
