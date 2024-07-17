'use client'

import {
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'
import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList } from 'recharts'

const chartData = [
    { month: 'January', visitors: 186 },
    { month: 'February', visitors: 205 },
    { month: 'March', visitors: -207 },
    { month: 'April', visitors: 173 },
    { month: 'May', visitors: -209 },
    { month: 'June', visitors: 214 }
]

const chartConfig = {
    visitors: {
        label: 'Visitors'
    }
} satisfies ChartConfig

export default function BarChartNegativeDemo() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Bar Chart - Negative</Card.Title>
                <Card.Description>January - June 2024</Card.Description>
            </Card.Header>
            <Card.Content>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel hideIndicator />}
                        />
                        <Bar dataKey='visitors'>
                            <LabelList position='top' dataKey='month' fillOpacity={1} />
                            {chartData.map((item) => (
                                <Cell
                                    key={item.month}
                                    fill={
                                        item.visitors > 0
                                            ? 'hsl(var(--chart-1))'
                                            : 'hsl(var(--chart-2))'
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer className='flex-col items-start gap-2 text-sm'>
                <div className='flex gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Showing total visitors for the last 6 months
                </div>
            </Card.Footer>
        </Card>
    )
}
