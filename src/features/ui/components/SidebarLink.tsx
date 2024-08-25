'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/features/shadcn/components/ui/tooltip';
import { cn } from '@/features/shadcn/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type ComponentType } from 'react';

interface SidebarLinkProps {
  href: string;
  title: string;
  Icon: ComponentType<{ className?: string }>;
  dialog: boolean;
}

const SidebarLink = ({ href, title, Icon, dialog }: SidebarLinkProps) => {
  const pathname = usePathname();
  const baseClasses = dialog
    ? 'flex items-center gap-4 px-2.5'
    : 'flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8';
  const linkClasses = dialog
    ? pathname.startsWith(href)
      ? cn(baseClasses, 'text-foreground')
      : cn(baseClasses, 'text-muted-foreground hover:text-foreground ')
    : pathname.startsWith(href)
      ? cn(baseClasses, 'bg-accent text-accent-foreground')
      : cn(baseClasses, 'text-muted-foreground');

  console.log(href);

  return dialog ? (
    <Link href={href} className={linkClasses}>
      <Icon className="h-5 w-5" />
      {title}
    </Link>
  ) : (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link href={href} className={linkClasses}>
          <Icon className="h-5 w-5" />
          <span className="sr-only">{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{title}</TooltipContent>
    </Tooltip>
  );
};

export default SidebarLink;
