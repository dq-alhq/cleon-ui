'use client'

import {
    Card,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig
} from '@/components/ui'
import { TrendingUp } from 'lucide-react'
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'

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

export default function RadarChartLegendDemo() {
    return (
        <Card>
            <Card.Header className='items-center pb-4'>
                <Card.Title>Radar Chart - Legend</Card.Title>
                <Card.Description>
                    Showing total visitors for the last 6 months
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <ChartContainer
                    config={chartConfig}
                    className='mx-auto aspect-square max-h-[250px]'
                >
                    <RadarChart
                        data={chartData}
                        margin={{
                            top: -40,
                            bottom: -10
                        }}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator='line' />}
                        />
                        <PolarAngleAxis dataKey='month' />
                        <PolarGrid />
                        <Radar
                            dataKey='desktop'
                            fill='var(--color-desktop)'
                            fillOpacity={0.6}
                        />
                        <Radar dataKey='mobile' fill='var(--color-mobile)' />
                        <ChartLegend className='mt-8' content={<ChartLegendContent />} />
                    </RadarChart>
                </ChartContainer>
            </Card.Content>
            <Card.Footer className='flex-col gap-2 pt-4 text-sm'>
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
