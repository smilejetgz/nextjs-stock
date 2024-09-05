'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/features/shadcn/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { type ReactNode } from 'react';

interface InterceptDialogProps {
  children: ReactNode;
}

const InterceptDialog = ({ children }: InterceptDialogProps) => {
  const router = useRouter();
  const closeDialog = () => {
    router.back();
  };
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={closeDialog}>
      <DialogContent className="border-none bg-transparent p-0 pl-1 pr-1">
        <DialogHeader>
          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InterceptDialog;
