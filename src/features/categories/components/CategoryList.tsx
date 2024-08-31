'use client';

import { DataTable } from '@/features/ui/components/DataTable/DataTable';
import {
  type CategoryListProps,
  columns,
} from '@/features/categories/components/Columns';

const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <div>
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoryList;
