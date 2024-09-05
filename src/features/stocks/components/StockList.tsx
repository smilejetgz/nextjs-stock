'use client';

import { DataTable } from '@/features/ui/components/DataTable/DataTable';
import {
  type StockListProps,
  columns,
} from '@/features/stocks/components/Columns';

const StockList = ({ stocks }: StockListProps) => {
  return <DataTable columns={columns} data={stocks} filtering="name" />;
};

export default StockList;
