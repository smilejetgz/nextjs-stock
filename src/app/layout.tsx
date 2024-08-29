import { type ReactNode } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/features/ui/components/Header/Header';
import Sidebar from '@/features/ui/components/Sidebar/Sidebar';
import { ThemeProvider } from '@/features/shadcn/components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'] });

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <Sidebar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
              <Header />
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default AdminLayout;
