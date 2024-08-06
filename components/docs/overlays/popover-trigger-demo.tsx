'use client'

import { Avatar, Button, Popover } from '@/components/ui'

export default function PopoverTriggerDemo() {
    return (
        <Popover>
            <Popover.Trigger>
                <Avatar src='https://github.com/dq-alhq.png' />
            </Popover.Trigger>
            <Popover.Content className='min-w-72'>
                <Popover.Header>
                    <Popover.Title>Email</Popover.Title>
                    <Popover.Description>
                        We'll send you an email to log in.
                    </Popover.Description>
                </Popover.Header>
                <Popover.Footer>
                    <Button>Send Login Link</Button>
                </Popover.Footer>
            </Popover.Content>
        </Popover>
    )
}
