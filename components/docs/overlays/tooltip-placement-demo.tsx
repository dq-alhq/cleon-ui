'use client'

import { type TooltipProps } from 'react-aria-components'

import { Button, Tooltip } from '@/components/ui'

type Placement = Pick<TooltipProps, 'placement'>['placement']
const placements: Placement[] = ['bottom', 'top', 'left', 'start', 'right', 'end']
export default function TooltipPlacementDemo() {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w-full'>
            {placements.map((placement, idx) => (
                <Tooltip key={idx}>
                    <Button className='mx-auto' size='sm' variant='outline'>
                        {placement}
                    </Button>
                    <Tooltip.Content placement={placement}>
                        Tooltip shown at <strong>{placement}</strong>.
                    </Tooltip.Content>
                </Tooltip>
            ))}
        </div>
    )
}
