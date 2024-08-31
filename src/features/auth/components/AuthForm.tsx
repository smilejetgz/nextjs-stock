'use client';

import type * as types from '@/features/auth/types';
import * as validators from '@/features/auth/validators';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import { useForm, type SubmitHandler } from 'react-hook-form';

type AuthFormProps =
  | {
      kind: 'login';
      onSubmit: SubmitHandler<types.Signin>;
    }
  | {
      kind: 'register';
      onSubmit: SubmitHandler<types.Signup>;
    };

const AuthForm = ({ kind, onSubmit }: AuthFormProps) => {
  const form = useForm<
    typeof onSubmit extends SubmitHandler<types.Signin>
      ? types.Signin
      : types.Signup
  >({
    resolver: zodResolver(
      kind === 'login' ? validators.signin : validators.signup,
    ),
    defaultValues: {
      email: kind === 'login' ? 'smilejettt@admin.com' : '',
      password: kind === 'login' ? 'Aa123456789.' : '',
      name: kind === 'register' ? '' : undefined,
    },
  });

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{capitalize(kind)}</CardTitle>
        {kind === 'register' ? (
          <CardDescription>
            Enter your email below to create your new account.
          </CardDescription>
        ) : (
          <CardDescription>
            Enter your email below to sign in to your account.
          </CardDescription>
        )}
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative space-y-8"
        >
          <CardContent className="grid gap-4">
            {kind === 'register' && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    {form.formState.errors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter a strong password"
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {capitalize(kind)}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AuthForm;
