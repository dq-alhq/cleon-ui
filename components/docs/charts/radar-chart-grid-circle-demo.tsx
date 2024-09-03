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

export default function RadarChartGridCircleDemo() {
    return (
        <Card>
            <Card.Header className='items-center pb-4'>
                <Card.Title>Radar Chart - Grid Circle</Card.Title>
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
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <PolarGrid gridType='circle' />
                        <PolarAngleAxis dataKey='month' />
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
                    Trending up by 5.2% this month <IconTrendingUp className='h-4 w-4' />
                </div>
                <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                    January - June 2024
                </div>
            </Card.Footer>
        </Card>
    )
}
