'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/features/shadcn/components/ui/tooltip';
import SidebarLink from '@/features/ui/components/SidebarLink';
import { Home, Package, Package2, Settings, Tag, Users2 } from 'lucide-react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        <Link
          href="dashboard"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Home</span>
        </Link>
        <TooltipProvider>
          <SidebarLink
            href="/admin/dashboard"
            title="Dashboard"
            Icon={Home}
            dialog={false}
          />
          <SidebarLink
            href="/admin/categories"
            title="Categories"
            Icon={Tag}
            dialog={false}
          />
          <SidebarLink
            href="/admin/stocks"
            title="Stocks"
            Icon={Package}
            dialog={false}
          />
          <SidebarLink
            href="/admin/user"
            title="User"
            Icon={Users2}
            dialog={false}
          />
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default Sidebar;
