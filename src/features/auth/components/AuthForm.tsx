'use client';

import type * as types from '@/features/auth/types';
import * as validators from '@/features/auth/validators';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { capitalize } from 'lodash';
import Link from 'next/link';
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
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">{capitalize(kind)}</CardTitle>
          <CardDescription>
            {kind === 'register'
              ? 'Create a new account by filling out the form below.'
              : 'Sign in to your account using your email and password.'}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative space-y-6"
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
                      <Input placeholder="your.email@example.com" {...field} />
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
              <Button type="submit" className="mt-4 w-full">
                {capitalize(kind)}
              </Button>
            </CardContent>
          </form>
        </Form>
      </Card>
      <div className="mt-6 text-center text-sm">
        {kind === 'login' ? (
          <>
            <span className="text-gray-500">Do not have an account?</span>{' '}
            <Link
              href="sign-up"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Register here
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-500">Already have an account?</span>{' '}
            <Link
              href="sign-in"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
