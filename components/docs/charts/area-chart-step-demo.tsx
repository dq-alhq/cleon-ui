'use client'

import { IconTrendingUp } from 'cleon-icons'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'

const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 }
]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
        icon: IconTrendingUp
    }
} satisfies ChartConfig

export default function AreaChartStepDemo() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Area Chart - Step</Card.Title>
                <Card.Description>
                    Showing total visitors for the last 6 months
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey='month'
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Area
                            dataKey='desktop'
                            type='step'
                            fill='var(--color-desktop)'
                            fillOpacity={0.4}
                            stroke='var(--color-desktop)'
                        />
                    </AreaChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer>
                <div className='flex w-full items-start gap-2 text-sm'>
                    <div className='grid gap-2'>
                        <div className='flex items-center gap-2 font-medium leading-none'>
                            Trending up by 5.2% this month{' '}
                            <IconTrendingUp className='h-4 w-4' />
                        </div>
                        <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                            January - June 2024
                        </div>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    )
}
