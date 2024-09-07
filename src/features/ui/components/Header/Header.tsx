'use client';

import { Button } from '@/features/shadcn/components/ui/button';
import { Input } from '@/features/shadcn/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/features/shadcn/components/ui/sheet';
import { PanelLeft, Search } from 'lucide-react';
import { Separator } from '@/features/shadcn/components/ui/separator';
import { ModeToggle } from '@/features/ui/components/Header/ModeToggle';
import BreadcrumbNavigation from '@/features/ui/components/Header/Breadcrumb';
import NavLinks from '@/features/ui/components/NavLinks';
import AuthMenu from '@/features/auth/components/AuthMenu';

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
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search product [ID]"
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div>
      <ModeToggle />
      <AuthMenu />
    </header>
  );
};

export default Header;
