import { LoaderCircle, Grid2x2X } from 'lucide-react';

interface StatusProps {
  label?: string;
}

export const Loading = ({ label }: StatusProps) => {
  return (
    <div className="flex animate-pulse items-center justify-center p-4">
      <LoaderCircle className="animate-spin text-2xl" />
      <span className="ml-3">{label}</span>
    </div>
  );
};

export const NotFound = ({ label }: StatusProps) => {
  return (
    <div className="flex animate-bounce items-center justify-center p-4">
      <Grid2x2X className="animate-pulse text-2xl" />
      <span className="ml-3 animate-pulse">{label}</span>
    </div>
  );
};
