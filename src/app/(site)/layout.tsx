'use client';

import { type ReactNode, useEffect } from 'react';
import Header from '@/features/ui/components/Header/Header';
import Sidebar from '@/features/ui/components/Sidebar/Sidebar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Loading } from '@/features/ui/components/Status';

interface SiteLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const SiteLayout = ({ children, modal }: SiteLayoutProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/sign-in');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading label="loading..." />
      </div>
    );
  }

  return status === 'authenticated' ? (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {modal}
          {children}
        </main>
      </div>
    </div>
  ) : null;
};

export default SiteLayout;
