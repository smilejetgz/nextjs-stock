import { type StockItem } from '@/features/stocks/types';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/features/shadcn/components/ui/dropdown-menu';
import { toDateString } from '@/features/shared/helpers/date';
import { DataTableColumnHeader } from '@/features/ui/components/DataTable/DataTableColumnHeader';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { type ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export type StockListProps = {
  stocks: StockItem[];
};

export const columns: ColumnDef<StockItem>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Name"
        className="w-[50px]"
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="hidden justify-center sm:table-cell"
        column={column}
        title="Created On"
      />
    ),
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue('createdAt'));
      const formatted = toDateString(createdAt);

      return (
        <div className="hidden justify-center font-medium sm:table-cell">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="hidden justify-center sm:table-cell"
        column={column}
        title="Last Modified"
      />
    ),
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue('updatedAt'));
      const formatted = toDateString(updatedAt);

      return (
        <div className="hidden justify-center font-medium sm:table-cell">
          {formatted}
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(String(stock.id))}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`stocks/${stock.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`stocks/${stock.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`stocks/${stock.id}/delete`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
