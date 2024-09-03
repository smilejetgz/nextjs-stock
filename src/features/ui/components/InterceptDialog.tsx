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
    <Dialog open onOpenChange={closeDialog}>
      <DialogContent className="border-none bg-transparent p-0">
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
