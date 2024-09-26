import BarChartMixedDemo from '@/components/docs/charts/bar-chart-mixed-demo'
import GridListDragDemo from '@/components/docs/collections/grid-list-drag-demo'
import { Button, buttonVariants } from '@/components/ui'

import DataFormSink from '../sink/data-form'
import OptionsSink from '../sink/options'
import TableSink from '../sink/table'

export default function ThemeContainer() {
    return (
        <div className='container w-full flex flex-col gap-6 items-center py-6'>
            <div className='w-full flex gap-2 items-center justify-around flex-wrap p-4 rounded-lg border'>
                {Object.keys(buttonVariants.variants.variant).map((variant) => (
                    <Button key={variant} variant={variant as any}>
                        {variant}
                    </Button>
                ))}
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 justify-between gap-6 w-full'>
                <DataFormSink />
                <OptionsSink />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 justify-between gap-6 w-full'>
                <div className='grid gap-6'>
                    <BarChartMixedDemo />
                    <GridListDragDemo />
                </div>
                <div className='lg:col-span-2'>
                    <TableSink />
                </div>
            </div>
        </div>
    )
}
