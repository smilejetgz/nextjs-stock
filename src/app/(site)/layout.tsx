'use client';

import { type ReactNode } from 'react';
import Header from '@/features/ui/components/Header/Header';
import Sidebar from '@/features/ui/components/Sidebar/Sidebar';
import ProtectedRoute from '@/features/auth/guards/ProtectedRoute';

interface SiteLayoutProps {
  children: ReactNode;
}

const SiteLayout = ({ children }: SiteLayoutProps) => {
  return (
    <ProtectedRoute roles={['ADMIN', 'MANAGER']}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <Header />
          <main className="grid flex-1 grid-cols-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SiteLayout;
