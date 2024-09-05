'use client';

import {
  type CategoryDetails,
  type UpdateCategoryInput,
  type AddCategoryInput,
} from '@/features/categories/types';
import * as validators from '@/features/categories/validators';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/features/shadcn/components/ui/form';
import { Input } from '@/features/shadcn/components/ui/input';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { toDateString } from '@/features/shared/helpers/date';
import { ButtonBack } from '@/features/ui/components/Buttons';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { useForm, type SubmitHandler } from 'react-hook-form';

export type CategoryFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddCategoryInput>;
    }
  | {
      kind: 'edit';
      category: Omit<CategoryDetails, 'user'>;
      onSubmit: SubmitHandler<UpdateCategoryInput>;
    }
  | {
      kind: 'remove';
      category: CategoryDetails;
      onSubmit: () => void;
    };

const CategoryForm = (props: CategoryFormProps) => {
  const { kind, onSubmit } = props;
  const title = `${capitalize(kind)}`;
  const form = useForm<
    typeof onSubmit extends SubmitHandler<AddCategoryInput>
      ? AddCategoryInput
      : UpdateCategoryInput
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.update,
    ),
    defaultValues:
      kind === 'edit' ? { name: props.category.name || '' } : { name: '' },
  });

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title} Category</CardTitle>
        <CardDescription className="mt-2">
          {kind === 'remove'
            ? 'Are you sure you want to remove this category?'
            : `Please enter the name to ${kind} a category.`}
        </CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent>
        {kind === 'remove' ? (
          <>
            <p>
              <strong>Name:</strong>
              {` ${props.category.name}`}
            </p>
            <p>
              <strong>Created by:</strong>
              {` ${props.category.user.name}, ${props.category.user.email}`}
            </p>
            <p>
              <strong>Created on:</strong>
              {` ${toDateString(props.category.createdAt)}`}
            </p>
            <p>
              <strong>Last modified:</strong>
              {` ${toDateString(props.category.updatedAt)}`}
            </p>
            <div className="mt-6 flex justify-between">
              <ButtonBack />
              <Button type="button" size="sm" onClick={onSubmit}>
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter category name"
                        className="max-w-full"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="mt-6 flex justify-between">
                <ButtonBack />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!form.formState.isValid}
                >
                  Confirm
                </Button>
              </div>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
