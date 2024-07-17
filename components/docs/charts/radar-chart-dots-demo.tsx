'use client'

import {
    Card,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'
import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 273 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 }
]

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))'
    }
} satisfies ChartConfig

export default function RadarChartDotsDemo() {
    return (
        <Card>
            <Card.Header className='items-center'>
                <Card.Title>Radar Chart - Dots</Card.Title>
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
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey='month' />
                        <PolarGrid />
                        <Radar
                            dataKey='desktop'
                            fill='var(--color-desktop)'
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer className='flex-col gap-2 text-sm'>
                <div className='flex items-center gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                </div>
                <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                    January - June 2024
                </div>
            </Card.Footer>
        </Card>
    )
}
