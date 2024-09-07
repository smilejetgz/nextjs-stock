'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Label,
  LabelList,
  Pie,
  PieChart,
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
import {
  useGetStockCountByCategory,
  useGetStockCountStatus,
} from '@/features/dashboard/hooks/api';
import { Loading, NotFound } from '@/features/ui/components/Status';
import { useMemo } from 'react';

const chartConfigChartStockCountByCategory = {
  stock: {
    label: 'Stock',
    color: 'hsl(var(--chart-1))',
  },
  label: {
    color: 'hsl(var(--background))',
  },
} satisfies ChartConfig;

export const ChartStockCountByCategory = () => {
  const {
    data: stockCountByCategory,
    isLoading: isLoadingStockCountByCategory,
  } = useGetStockCountByCategory();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <CardDescription>Amount stock by category</CardDescription>
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
                tickFormatter={(value) => String(value)}
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
};

// ChartStockCountStatus
const chartConfigChartStockCountStatus = {
  value: {
    label: 'value',
  },
  APPROVED: {
    label: 'APPROVED',
    color: 'hsl(var(--chart-1))',
  },
  REJECTED: {
    label: 'REJECTED',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export const ChartStockCountStatus = () => {
  const { data: stockCountStatus, isLoading: isLoadingStockCountStatus } =
    useGetStockCountStatus();

  const totalStatus = useMemo(() => {
    return stockCountStatus?.reduce((acc, curr) => acc + curr.value, 0) || 0;
  }, [stockCountStatus]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Stock status</CardTitle>
        <CardDescription>
          stock count status (Approved/Rejected)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfigChartStockCountStatus}
          className="mx-auto aspect-square max-h-[250px]"
        >
          {isLoadingStockCountStatus ? (
            <Loading label="Loading..." />
          ) : !stockCountStatus ? (
            <NotFound label="No data found" />
          ) : (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={stockCountStatus}
                dataKey="value"
                nameKey="key"
                innerRadius={60}
                strokeWidth={5}
              >
                {stockCountStatus.map((entry) => (
                  <Cell
                    key={`cell-${entry.key}`}
                    fill={
                      chartConfigChartStockCountStatus[entry.key]?.color ||
                      'gray'
                    }
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalStatus.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Amount
                          </tspan>
                        </text>
                      );
                    }
                    return null;
                  }}
                />
              </Pie>
            </PieChart>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
