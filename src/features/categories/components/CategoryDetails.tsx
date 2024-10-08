'use client';

import { useGetCategory } from '@/features/categories/hooks/api';
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

const CategoryDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: category, isLoading } = useGetCategory(+id);

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Category Details</CardTitle>
        <CardDescription className="mt-2">ID: {id}</CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      {isLoading ? (
        <Loading label="Loading category details..." />
      ) : !category ? (
        <NotFound label="Category not found" />
      ) : (
        <CardContent>
          <p>
            <strong>Name:</strong>
            {` ${category.name}`}
          </p>
          <p>
            <strong>Created by:</strong>
            {` ${category.user.name}, ${category.user.email}`}
          </p>
          <p>
            <strong>Created on:</strong>
            {` ${toDateString(category.createdAt)}`}
          </p>
          <p>
            <strong>Last modified:</strong>
            {` ${toDateString(category.updatedAt)}`}
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

export default CategoryDetails;
