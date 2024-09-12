'use client';

import { Home, Package, Tag, Users2 } from 'lucide-react';
import SidebarLink from '@/features/ui/components/Sidebar/SidebarLink';

interface NavLinksProps {
  dialog: boolean;
}

const NavLinks = ({ dialog }: NavLinksProps) => (
  <>
    <SidebarLink href="/" title="Dashboard" Icon={Home} dialog={dialog} />
    <SidebarLink
      href="/categories"
      title="Categories"
      Icon={Tag}
      dialog={dialog}
    />
    <SidebarLink href="/stocks" title="Stocks" Icon={Package} dialog={dialog} />
    <SidebarLink href="/users" title="User" Icon={Users2} dialog={dialog} />
  </>
);

export default NavLinks;
