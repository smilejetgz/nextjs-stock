'use client';

import UserList from '@/features/users/components/UserList';
import { useGetUsers } from '@/features/users/hooks/api';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import { Loading, NotFound } from '@/features/ui/components/Status';

const UserPage = () => {
  const { data, status } = useGetUsers();

  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription className="mt-2">Manage your users.</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'pending' ? (
          <Loading label="loading..." />
        ) : !data ? (
          <NotFound label="No users found" />
        ) : (
          <UserList users={data} />
        )}
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          {/* Showing <strong>1-10</strong> of <strong>32</strong> products */}
        </div>
      </CardFooter>
    </Card>
  );
};

export default UserPage;
