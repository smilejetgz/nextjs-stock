'use client';

import EditStock from '@/features/stocks/components/EditStock';
import RemoveStock from '@/features/stocks/components/RemoveStock';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface InterceptStockPageProps {
  params: {
    kind: string;
  };
}

const InterceptStockPage = ({ params: { kind } }: InterceptStockPageProps) => {
  return (
    <InterceptDialog>
      {kind === 'edit' ? (
        <EditStock />
      ) : kind === 'delete' ? (
        <RemoveStock />
      ) : null}
    </InterceptDialog>
  );
};

export default InterceptStockPage;
