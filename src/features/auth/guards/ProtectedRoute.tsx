'use client';

import { useToast } from '@/features/shadcn/hooks/use-toast';
import { Loading } from '@/features/ui/components/Status';
import { type Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

interface ProtectedRouteProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedRoute = ({ roles, children }: ProtectedRouteProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      toast({ description: 'Please login before' });
      router.replace('/auth/sign-in');
      return;
    }
    if (!roles) return setIsAllowed(true);
    if (session && roles.includes(session.user.role)) {
      return setIsAllowed(true);
    }
    toast({
      description: 'You are not allowed to access this page',
    });
    router.replace('/forbidden');
  }, [roles, router, session, session?.user.role, toast, status]);

  if (status === 'loading')
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading label="loading..." />
      </div>
    );
  if (isAllowed) return <>{children}</>;
  return null;
};

export default ProtectedRoute;
