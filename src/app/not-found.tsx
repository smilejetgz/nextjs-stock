import { Button } from '@/features/shadcn/components/ui/button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10">
      <h2 className="text-center text-3xl font-bold">404 Page Not Found</h2>
      <Button asChild>
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
