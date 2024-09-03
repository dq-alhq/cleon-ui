'use client'

import { IconTrendingUp } from 'cleon-icons'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
    Card,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'

const chartData = [
    { month: 'January', desktop: 186, mobile: 80 },
    { month: 'February', desktop: 305, mobile: 200 },
    { month: 'March', desktop: 237, mobile: 120 },
    { month: 'April', desktop: 73, mobile: 190 },
    { month: 'May', desktop: 209, mobile: 130 },
    { month: 'June', desktop: 214, mobile: 140 }
]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))'
    },
    mobile: {
        label: 'Mobile',
        color: 'hsl(var(--chart-2))'
    }
} satisfies ChartConfig

export default function BarChartStackedDemo() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Bar Chart - Stacked + Legend</Card.Title>
                <Card.Description>January - June 2024</Card.Description>
            </Card.Header>
            <Card.Content>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                            dataKey='desktop'
                            stackId='a'
                            fill='var(--color-desktop)'
                            radius={[0, 0, 4, 4]}
                        />
                        <Bar
                            dataKey='mobile'
                            stackId='a'
                            fill='var(--color-mobile)'
                            radius={[4, 4, 0, 0]}
                        />
                    </BarChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer className='flex-col items-start gap-2 text-sm'>
                <div className='flex gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month <IconTrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Showing total visitors for the last 6 months
                </div>
            </Card.Footer>
        </Card>
    )
}
