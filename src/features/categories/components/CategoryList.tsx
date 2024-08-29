'use client';

import { type CategoryItem } from '@/features/categories/types';
import { DataTable } from '@/features/ui/components/DataTable/DataTable';
import { DataTableColumnHeader } from '@/features/ui/components/DataTable/DataTableColumnHeader';
import { type ColumnDef } from '@tanstack/react-table';

export type CategoryListProps = {
  categories: CategoryItem[];
};

const CategoryList = ({ categories }: CategoryListProps) => {
  const columns: ColumnDef<CategoryItem>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
  ];

  return (
    <div>
      <DataTable columns={columns} data={categories} filtering="name" />
    </div>
  );
};

export default CategoryList;
