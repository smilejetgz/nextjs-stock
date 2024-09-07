import { type UserItem } from '@/features/users/types';
import { toDateString } from '@/features/shared/helpers/date';
import { DataTableColumnHeader } from '@/features/ui/components/DataTable/DataTableColumnHeader';
import { type ColumnDef } from '@tanstack/react-table';
import { getImagePath } from '@/features/shared/helpers/upload';
import Image from 'next/image';

export type UserListProps = {
  users: UserItem[];
};

export const columns: ColumnDef<UserItem>[] = [
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
    accessorKey: 'image',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Image"
        className="hidden justify-center md:table-cell"
      />
    ),
    cell: ({ row }) => {
      const image = row.getValue('image');
      return (
        <Image
          alt="Product image"
          className="hidden aspect-square rounded-full object-cover md:table-cell"
          height="64"
          src={
            !image ? '/assets/images/avatar.png' : getImagePath(String(image))
          }
          width="64"
        />
      );
    },
  },
  {
    accessorKey: 'role',
    header: ({ column }) => (
      <DataTableColumnHeader
        className="hidden justify-center sm:table-cell"
        column={column}
        title="Role"
      />
    ),
    cell: ({ row }) => {
      const role = row.getValue('role');

      return (
        <div className="hidden justify-center sm:table-cell">
          {String(role)}
        </div>
      );
    },
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
        <div className="hidden justify-center sm:table-cell">{formatted}</div>
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
        <div className="hidden justify-center sm:table-cell">{formatted}</div>
      );
    },
  },
];
