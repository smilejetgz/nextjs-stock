'use client';

import { DataTable } from '@/features/ui/components/DataTable/DataTable';
import {
  type CategoryListProps,
  columns,
} from '@/features/categories/components/Columns';

const CategoryList = ({ categories }: CategoryListProps) => {
  return <DataTable columns={columns} data={categories} filtering="name" />;
};

export default CategoryList;
