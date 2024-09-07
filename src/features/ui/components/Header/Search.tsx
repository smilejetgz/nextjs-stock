'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '@/features/shadcn/components/ui/input';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm) {
      router.push(`/stocks/${searchTerm}`);
    }
  };

  return (
    <div className="relative ml-auto flex-1 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search product [ID]"
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default SearchInput;
