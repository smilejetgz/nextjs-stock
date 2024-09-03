import { Button } from '@/features/shadcn/components/ui/button';
import { ArrowLeftToLine } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const ButtonBack = () => {
  const router = useRouter();
  return (
    <Button
      size="sm"
      type="button"
      className="flex items-center gap-1 rounded-full"
      onClick={() => router.back()}
    >
      <ArrowLeftToLine className="h-3.5 w-3.5" />
    </Button>
  );
};
