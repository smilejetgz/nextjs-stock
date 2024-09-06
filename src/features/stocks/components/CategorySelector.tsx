import { useGetCategories } from '@/features/categories/hooks/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/features/shadcn/components/ui/select';
import { toast } from '@/features/shadcn/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelector = ({ value, onChange }: CategorySelectorProps) => {
  const router = useRouter();
  const { data: categories, isLoading } = useGetCategories();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!categories || categories.length === 0) {
    toast({ description: 'Please add the category first.' });
    router.back();
    return null;
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={String(category.id)}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelector;
