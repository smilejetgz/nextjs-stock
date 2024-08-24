import { ThemeProvider } from '@/features/shadcn/components/ui/theme-provider';
import Header from '@/features/ui/components/Header';
import Sidebar from '@/features/ui/components/Sidebar';
import { type ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="bg-muted/40 flex min-h-screen w-full flex-col">
        {/* Sidebar */}
        <Sidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {/* Header */}
          <Header />
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
