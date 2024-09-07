'use client';

import { Button } from '@/features/shadcn/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/features/shadcn/components/ui/sheet';
import { PanelLeft } from 'lucide-react';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { ModeToggle } from '@/features/ui/components/Header/ModeToggle';
import BreadcrumbNavigation from '@/features/ui/components/Header/Breadcrumb';
import NavLinks from '@/features/ui/components/NavLinks';
import AuthMenu from '@/features/auth/components/AuthMenu';
import SearchInput from '@/features/ui/components/Header/Search';

const Header = () => {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="z-highest fixed left-0 top-0 sm:max-w-xs"
        >
          <SheetHeader>
            <SheetTitle>Menus</SheetTitle>
            <Separator />
            <SheetDescription></SheetDescription>
            <nav className="grid gap-6 text-lg font-medium">
              <NavLinks dialog={true} />
            </nav>
          </SheetHeader>
        </SheetContent>
      </Sheet>
      <BreadcrumbNavigation />
      <SearchInput />
      <ModeToggle />
      <AuthMenu />
    </header>
  );
};

export default Header;
