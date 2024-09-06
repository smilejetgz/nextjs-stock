'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/features/shadcn/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/features/shadcn/components/ui/chart';
import { useGetStockCountByCategory } from '@/features/dashboard/hooks/api';
import { Loading, NotFound } from '@/features/ui/components/Status';

const chartConfigChartStockCountByCategory = {
  stock: {
    label: 'Stock',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

export function ChartStockCountByCategory() {
  const {
    data: stockCountByCategory,
    isLoading: isLoadingStockCountByCategory,
  } = useGetStockCountByCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>Stock count by category</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoadingStockCountByCategory ? (
          <Loading label="Loading..." />
        ) : !stockCountByCategory ? (
          <NotFound label="Loading..." />
        ) : (
          <ChartContainer config={chartConfigChartStockCountByCategory}>
            <BarChart
              accessibilityLayer
              data={stockCountByCategory}
              layout="vertical"
              margin={{
                right: 16,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="stock" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="stock"
                layout="vertical"
                fill="var(--color-stock)"
                radius={4}
              >
                <LabelList
                  dataKey="category"
                  position="insideLeft"
                  offset={8}
                  className="fill-[--color-label]"
                  fontSize={12}
                />
                <LabelList
                  dataKey="stock"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}
