'use client';

import { type ReactNode, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/features/ui/components/Status';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading label="loading..." />
      </div>
    );
  }

  return status === 'unauthenticated' ? (
    <>
      <div className="flex min-h-screen items-center justify-center">
        {children}
      </div>
    </>
  ) : null;
};

export default AuthLayout;
