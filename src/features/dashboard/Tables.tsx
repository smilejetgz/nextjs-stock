import {
  useGetNewCategories,
  useGetNewStocks,
  useGetNewUsers,
} from '@/features/dashboard/hooks/api';
import { Button } from '@/features/shadcn/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/features/shadcn/components/ui/table';
import { toDateString } from '@/features/shared/helpers/date';
import { getImagePath } from '@/features/shared/helpers/upload';
import { Loading, NotFound } from '@/features/ui/components/Status';
import Image from 'next/image';

export const TableNewCategory = () => {
  const { data, isLoading } = useGetNewCategories();

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>New Categories</CardTitle>
          <CardDescription className="hidden"></CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1"></Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading label="Loading..."></Loading>
        ) : !data ? (
          <NotFound label="Category not fount."></NotFound>
        ) : (
          <Table>
            <TableBody>
              {data.map((key, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{key.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-right font-medium">
                      {toDateString(key.createdAt)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export const TableNewUsers = () => {
  const { data, isLoading } = useGetNewUsers();

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>New Users</CardTitle>
          <CardDescription className="hidden"></CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1"></Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading label="Loading..."></Loading>
        ) : !data ? (
          <NotFound label="Category not fount."></NotFound>
        ) : (
          <Table>
            <TableBody>
              {data.map((key, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{key.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      <Image
                        alt="Product image"
                        className="hidden aspect-square rounded-full object-cover md:table-cell"
                        height="27"
                        src={
                          !key.image
                            ? '/assets/images/avatar.png'
                            : getImagePath(key.image)
                        }
                        width="27"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{key.role}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-right font-medium">
                      {toDateString(key.createdAt)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export const TableNewStock = () => {
  const { data, isLoading } = useGetNewStocks();

  return (
    <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>New Stocks</CardTitle>
          <CardDescription className="hidden"></CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1"></Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading label="Loading..."></Loading>
        ) : !data ? (
          <NotFound label="Category not fount."></NotFound>
        ) : (
          <Table>
            <TableBody>
              {data.map((key, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="font-medium">{key.name}</div>
                  </TableCell>
                  <TableCell>
                    <Image
                      alt="Product image"
                      className="hidden aspect-square rounded-md object-cover md:table-cell"
                      height="64"
                      src={
                        !key.image
                          ? '/assets/images/no-image.png'
                          : getImagePath(key.image)
                      }
                      width="64"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{key.amount}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-right font-medium">
                      {toDateString(key.createdAt)}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
