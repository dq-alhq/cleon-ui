'use client'

import { Button, Popover } from '@/components/ui'
import { BellIcon } from 'lucide-react'

export default function PopoverArrowDemo() {
    return (
        <Popover>
            <Button variant='outline' size='icon'>
                <BellIcon />
            </Button>
            <Popover.Content showArrow={false} className='min-w-72'>
                You have 3 new notifications.
            </Popover.Content>
        </Popover>
    )
}
