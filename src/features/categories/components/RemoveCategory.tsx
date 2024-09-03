'use client';

import * as React from 'react';
import { useRemoveCategory } from '@/features/categories/hooks/api';
import { useToast } from '@/features/shadcn/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/features/shadcn/components/ui/alert-dialog';
import { type CategoryDetails } from '@/features/categories/types';

type RemoveCategoryProps = {
  id: CategoryDetails['id'];
};

const RemoveCategory = ({ id }: RemoveCategoryProps) => {
  const { mutateAsync: removeCategory, status } = useRemoveCategory(id);
  const { toast } = useToast();
  const isLoading = status === 'pending';

  const handleRemove = async () => {
    console.log('Handle Remove triggered');
    try {
      await removeCategory();
      console.log('Category removed successfully');
      toast({ description: 'Category removed successfully.' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to remove category.';
      toast({ description: errorMessage });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="relative flex w-full cursor-default select-none justify-start rounded-sm p-2 text-sm font-normal outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            category and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} disabled={isLoading}>
            {isLoading ? 'Removing...' : 'Continue'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveCategory;
