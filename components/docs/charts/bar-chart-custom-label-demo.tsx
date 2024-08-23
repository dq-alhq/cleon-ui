'use client'

import {
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'
import { IconTrendingChart3 } from 'justd-icons'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

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
    },
    label: {
        color: 'hsl(var(--background))'
    }
} satisfies ChartConfig

export default function BarChartCustomLabelDemo() {
    return (
        <Card>
            <Card.Header>
                <Card.Title>Bar Chart - Custom Label</Card.Title>
                <Card.Description>January - June 2024</Card.Description>
            </Card.Header>
            <Card.Content>
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        layout='vertical'
                        margin={{
                            right: 16
                        }}
                    >
                        <CartesianGrid horizontal={false} />
                        <YAxis
                            dataKey='month'
                            type='category'
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                            hide
                        />
                        <XAxis dataKey='desktop' type='number' hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' />}
                        />
                        <Bar
                            dataKey='desktop'
                            layout='vertical'
                            fill='var(--color-desktop)'
                            radius={4}
                        >
                            <LabelList
                                dataKey='month'
                                position='insideLeft'
                                offset={8}
                                className='fill-[--color-label]'
                                fontSize={12}
                            />
                            <LabelList
                                dataKey='desktop'
                                position='right'
                                offset={8}
                                className='fill-foreground'
                                fontSize={12}
                            />
                        </Bar>
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
