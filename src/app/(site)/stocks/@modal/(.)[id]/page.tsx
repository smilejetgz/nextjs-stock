'use client';

import StockDetails from '@/features/stocks/components/StockDetails';
import CreateStock from '@/features/stocks/components/CreateStock';
import InterceptDialog from '@/features/ui/components/InterceptDialog';

interface InterceptStockPageProps {
  params: {
    id: string;
  };
}

const InterceptStockPage = ({ params: { id } }: InterceptStockPageProps) => {
  return (
    <InterceptDialog>
      {id === 'add' ? <CreateStock /> : <StockDetails />}
    </InterceptDialog>
  );
};

export default InterceptStockPage;
