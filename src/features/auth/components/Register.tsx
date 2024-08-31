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
    await mutateAsync(credentials);
    toast({ description: 'You have already been registered' });
    router.replace('/auth/sign-in');
  };

  return <AuthForm kind="register" onSubmit={submit}></AuthForm>;
};

export default Register;
