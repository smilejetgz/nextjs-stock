'use client';

import { Home, Package, Tag, Users2 } from 'lucide-react';
import SidebarLink from '@/features/ui/components/SidebarLink';

interface NavLinksProps {
  dialog: boolean;
}

const NavLinks = ({ dialog }: NavLinksProps) => (
  <>
    <SidebarLink
      href="/admin/dashboard"
      title="Dashboard"
      Icon={Home}
      dialog={dialog}
    />
    <SidebarLink
      href="/admin/categories"
      title="Categories"
      Icon={Tag}
      dialog={dialog}
    />
    <SidebarLink
      href="/admin/stocks"
      title="Stocks"
      Icon={Package}
      dialog={dialog}
    />
    <SidebarLink
      href="/admin/user"
      title="User"
      Icon={Users2}
      dialog={dialog}
    />
  </>
);

export default NavLinks;
