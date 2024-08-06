'use client'

import { Button, Popover } from '@/components/ui'
import { type TooltipProps } from 'react-aria-components'

type Placement = Pick<TooltipProps, 'placement'>['placement']
const placements: Placement[] = ['bottom', 'top', 'left', 'start', 'right', 'end']
export default function PopoverPlacementDemo() {
    return (
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 w- full'>
            {placements.map((placement, idx) => (
                <Popover key={idx}>
                    <Button className='mx-auto' size='sm' variant='outline'>
                        {placement}
                    </Button>
                    <Popover.Content placement={placement}>
                        Popover shown at <strong>{placement}</strong>.
                    </Popover.Content>
                </Popover>
            ))}
        </div>
    )
}
