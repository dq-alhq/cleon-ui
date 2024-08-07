'use client'

import { Avatar, Menu } from '@/components/ui'
import {
    CommandIcon,
    HeadphonesIcon,
    LogOutIcon,
    SettingsIcon,
    SquarePlusIcon
} from 'lucide-react'

export default function MenuWithArrowDemo() {
    return (
        <>
            <Menu>
                <Menu.Trigger aria-label='Open Menu.'>
                    <Avatar className='size-10' src='https://github.com/dq-alhq.png' />
                </Menu.Trigger>
                <Menu.Content placement='bottom' showArrow className='min-w-64'>
                    <Menu.Section>
                        <Menu.Header separator>
                            <span className='block'>DQ Al-Haqqi</span>
                            <span className='font-normal text-muted-foreground'>@dq-alhq</span>
                        </Menu.Header>
                    </Menu.Section>
                    <Menu.Item>
                        <SettingsIcon />
                        Settings
                    </Menu.Item>
                    <Menu.Item href='#'>
                        <SquarePlusIcon />
                        Create Team
                    </Menu.Item>
                    <Menu.Item href='#'>
                        <CommandIcon />
                        Command Menu.
                        <Menu.Keyboard keys='⌘K' />
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item href='#'>
                        <HeadphonesIcon />
                        Contact Support
                    </Menu.Item>
                    <Menu.Separator />
                    <Menu.Item>
                        <LogOutIcon />
                        Log out
                    </Menu.Item>
                </Menu.Content>
            </Menu>
        </>
    )
}
