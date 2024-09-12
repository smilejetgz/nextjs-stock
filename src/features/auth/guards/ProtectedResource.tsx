import { Loading } from '@/features/ui/components/Status';
import { type Role } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { type ReactNode } from 'react';

interface ProtectedResourceProps {
  roles?: Role[];
  children: ReactNode;
}

const ProtectedResource = ({ roles, children }: ProtectedResourceProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading')
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading label="loading..." />
      </div>
    );
  if (status === 'unauthenticated') return null;
  if (
    status === 'authenticated' &&
    roles &&
    !roles.includes(session.user.role)
  ) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedResource;
