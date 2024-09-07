'use client';

import { DataTable } from '@/features/ui/components/DataTable/DataTable';
import {
  type UserListProps,
  columns,
} from '@/features/users/components/Columns';

const UserList = ({ users }: UserListProps) => {
  return <DataTable columns={columns} data={users} filtering="name" />;
};

export default UserList;
