'use client';

import {
  type StockDetails,
  type UpdateStockInput,
  type AddStockInput,
} from '@/features/stocks/types';
import * as validators from '@/features/stocks/validators';
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
  FormMessage,
} from '@/features/shadcn/components/ui/form';
import { Input } from '@/features/shadcn/components/ui/input';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { toDateString } from '@/features/shared/helpers/date';
import { ButtonBack } from '@/features/ui/components/Buttons';
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { ScrollArea } from '@/features/shadcn/components/ui/scroll-area';
import Image from 'next/image';
import { Textarea } from '@/features/shadcn/components/ui/textarea';
import ImageUploader from '@/features/ui/components/ImageUploader';
import { getImagePath } from '@/features/shared/helpers/upload';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/shadcn/components/ui/select';
import { useGetCategories } from '@/features/categories/hooks/api';
import { Loading, NotFound } from '@/features/ui/components/Status';

export type StockFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddStockInput>;
    }
  | {
      kind: 'edit';
      stock: Omit<StockDetails, 'user' | 'category'>;
      onSubmit: SubmitHandler<UpdateStockInput>;
    }
  | {
      kind: 'remove';
      stock: StockDetails;
      onSubmit: () => void;
    };

const StockForm = (props: StockFormProps) => {
  const { kind, onSubmit } = props;
  const title = `${capitalize(kind)}`;
  const { data: categories, isLoading } = useGetCategories();

  const form = useForm<
    typeof onSubmit extends SubmitHandler<AddStockInput>
      ? AddStockInput
      : UpdateStockInput
  >({
    mode: 'onBlur',
    resolver: zodResolver(
      kind === 'create' ? validators.add : validators.update,
    ),
    defaultValues:
      kind === 'edit'
        ? {
            ...props.stock,
            image: undefined,
          }
        : { name: '', amount: 0, image: null },
  });

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>{title} Stock</CardTitle>
        <CardDescription className="mt-2">
          {kind === 'remove'
            ? 'Are you sure you want to remove this stock?'
            : `Please enter the name to ${kind} a stock.`}
        </CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      <CardContent className="text-left">
        {kind === 'remove' ? (
          <>
            <div className="flex justify-center">
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="124"
                src={String(props.stock.image)}
                width="124"
              />
            </div>
            <Separator className="my-4" />
            <p>
              <strong>Name:</strong>
              {` ${props.stock.name}`}
            </p>
            <p>
              <strong>Category:</strong>
              {` ${props.stock.category.name}`}
            </p>
            <p>
              <strong>Amount:</strong>
              {` ${props.stock.amount}`}
            </p>
            <p>
              <strong>Created by:</strong>
              {` ${props.stock.user.name}, ${props.stock.user.email}`}
            </p>
            <p>
              <strong>Created on:</strong>
              {` ${toDateString(props.stock.createdAt)}`}
            </p>
            <p>
              <strong>Last modified:</strong>
              {` ${toDateString(props.stock.updatedAt)}`}
            </p>
            <strong>Detail:</strong>
            <ScrollArea className="h-[150px] rounded-md border p-2">
              <div>{` ${props.stock.detail}`}</div>
            </ScrollArea>
            <div className="mt-6 flex justify-between">
              <ButtonBack />
              <Button type="button" size="sm" onClick={onSubmit}>
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
              <ImageUploader
                defaultImage={
                  kind === 'edit' && props.stock.image
                    ? getImagePath(props.stock.image)
                    : '/assets/images/no-image.png'
                }
                onImageChanged={(image) => {
                  form.setValue('image', image, { shouldValidate: true });
                }}
                error={form.formState.errors.image?.message}
              ></ImageUploader>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter stock name"
                        className="max-w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter stock amount"
                        className="max-w-full"
                        type="number"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value)}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="detail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Taylor's version"
                        {...field}
                        className="resize-none"
                      ></Textarea>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="APPROVED">Approved</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              {isLoading ? (
                <Loading label="Category Loading..." />
              ) : !categories ? (
                <NotFound label="Please add the category first." />
              ) : (
                <FormField
                  control={form.control}
                  name="CategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          defaultValue={
                            kind === 'create'
                              ? undefined
                              : String(props.stock.CategoryId)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={String(category.id)}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="mt-6 flex justify-between">
                <ButtonBack />
                <Button
                  type="submit"
                  size="sm"
                  disabled={!form.formState.isValid && isLoading}
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

export default StockForm;
