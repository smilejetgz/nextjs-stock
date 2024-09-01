'use client';

import AuthForm from '@/features/auth/components/AuthForm';
import { useRegister } from '@/features/auth/hooks/api';
import { type Signup } from '@/features/auth/types';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import { useRouter } from 'next/navigation';

const Register = () => {
  const router = useRouter();
  const { mutateAsync } = useRegister();
  const { toast } = useToast();

  const submit = async (credentials: Signup) => {
    try {
      await mutateAsync(credentials);
      toast({ description: 'Registration successful. You can now sign in.' });
      router.replace('/auth/sign-in');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Registration failed. Please try again.';
      toast({ description: errorMessage });
    }
  };

  return <AuthForm kind="register" onSubmit={submit} />;
};

export default Register;
