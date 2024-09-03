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
      kind === 'edit'
        ? { name: props.category.name || '' } // Ensure the default value is never undefined
        : { name: '' },
  });

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title} Category</CardTitle>
        <CardDescription className="mt-2">
          Please enter the name to {kind} a new category.
        </CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent>
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
