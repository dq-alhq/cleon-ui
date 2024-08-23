'use client'

import {
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'
import { IconTrendingChart3 } from 'justd-icons'
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from 'recharts'

const chartData = [
    { browser: 'chrome', visitors: 187, fill: 'var(--color-chrome)' },
    { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
    { browser: 'firefox', visitors: 275, fill: 'var(--color-firefox)' },
    { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
    { browser: 'other', visitors: 90, fill: 'var(--color-other)' }
]

const chartConfig = {
    visitors: {
        label: 'Visitors'
    },
    chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))'
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))'
    },
    firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))'
    },
    edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))'
    },
    other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))'
    }
} satisfies ChartConfig

export default function BarChartActiveDemo() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Bar Chart - Active</Card.Title>
                <Card.Description>January - June 2024</Card.Description>
            </Card.Header>
            <Card.Content>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='browser'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey='visitors'
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        fillOpacity={0.8}
                                        stroke={props.payload.fill}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                )
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer className='flex-col items-start gap-2 text-sm'>
                <div className='flex gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month{' '}
                    <IconTrendingChart3 className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Showing total visitors for the last 6 months
                </div>
            </Card.Footer>
        </Card>
    )
}
