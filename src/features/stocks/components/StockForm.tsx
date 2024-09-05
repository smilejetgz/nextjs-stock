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

export type StockFormProps =
  | {
      kind: 'create';
      onSubmit: SubmitHandler<AddStockInput>;
    }
  | {
      kind: 'edit';
      stock: Omit<StockDetails, 'user'>;
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
      kind === 'edit' ? { name: props.stock.name || '' } : { name: '' },
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter stock name"
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

export default StockForm;
