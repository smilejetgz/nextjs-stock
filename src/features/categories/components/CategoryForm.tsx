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
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { ArrowLeftToLine } from 'lucide-react';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';

export type CategoryFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddCategoryInput>;
    }
  | {
      kind: 'edit';
      category: CategoryDetails;
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
    defaultValues: kind === 'edit' ? props.category : undefined,
  });
  console.log(kind, onSubmit);
  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <div className="flex items-center">
          <div className="flex-col">
            <CardTitle>{title} Category</CardTitle>
            <CardDescription className="mt-2">
              Please enter the name to {kind} a new category.
            </CardDescription>
          </div>
          <div className="ml-auto flex justify-items-end gap-2">
            <Button size="sm">
              <Link href="/categories" className="flex h-7 items-center gap-1">
                <ArrowLeftToLine className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Category
                </span>
              </Link>
            </Button>
          </div>
        </div>
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
            ></FormField>
            <div className="flex justify-end">
              <Button
                type="submit"
                className="mt-4"
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
