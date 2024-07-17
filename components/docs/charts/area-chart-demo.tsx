'use client'

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

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
        color: 'hsl(var(--danger))'
    },
    mobile: {
        label: 'Mobile',
        color: 'hsl(var(--primary))'
    }
} satisfies ChartConfig

export default function AreaChartDemo() {
    return (
        <ChartContainer config={chartConfig}>
            <AreaChart accessibilityLayer data={chartData}>
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
                    content={<ChartTooltipContent indicator='dot' />}
                />
                <Area
                    dataKey='mobile'
                    type='natural'
                    fill='var(--color-mobile)'
                    fillOpacity={0.4}
                    stroke='var(--color-mobile)'
                    stackId='a'
                />
                <Area
                    dataKey='desktop'
                    type='natural'
                    fill='var(--color-desktop)'
                    fillOpacity={0.4}
                    stroke='var(--color-desktop)'
                    stackId='a'
                />
            </AreaChart>
        </ChartContainer>
    )
}
