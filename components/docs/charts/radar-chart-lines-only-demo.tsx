'use client'

import { IconTrendingUp } from 'cleon-icons'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

import {
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'

const chartData = [
    { month: 'January', desktop: 186, mobile: 160 },
    { month: 'February', desktop: 185, mobile: 170 },
    { month: 'March', desktop: 207, mobile: 180 },
    { month: 'April', desktop: 173, mobile: 160 },
    { month: 'May', desktop: 160, mobile: 190 },
    { month: 'June', desktop: 174, mobile: 204 }
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

export default function RadarChartLinesOnlyDemo() {
    return (
        <Card>
            <Card.Header className='items-center pb-4'>
                <Card.Title>Radar Chart - Lines Only</Card.Title>
                <Card.Description>
                    Showing total visitors for the last 6 months
                </Card.Description>
            </Card.Header>
            <Card.Content className='pb-0'>
                <ChartContainer
                    config={chartConfig}
                    className='mx-auto aspect-square max-h-[250px]'
                >
                    <RadarChart data={chartData}>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' />}
                        />
                        <PolarAngleAxis dataKey='month' />
                        <PolarGrid radialLines={false} />
                        <Radar
                            dataKey='desktop'
                            fill='var(--color-desktop)'
                            fillOpacity={0}
                            stroke='var(--color-desktop)'
                            strokeWidth={2}
                        />
                        <Radar
                            dataKey='mobile'
                            fill='var(--color-mobile)'
                            fillOpacity={0}
                            stroke='var(--color-mobile)'
                            strokeWidth={2}
                        />
                    </RadarChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month <IconTrendingUp className='h-4 w-4' />
                </div>
                <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                    January - June 2024
                </div>
            </Card.Footer>
        </Card>
    )
}
