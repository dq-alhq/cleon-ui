'use client'

import { Menu } from '@/components/ui'

export default function MenuDangerDemo() {
    return (
        <Menu>
            <Menu.Trigger>Open</Menu.Trigger>
            <Menu.Content className='min-w-48' placement='bottom'>
                <Menu.Item>View</Menu.Item>
                <Menu.Item>Edit</Menu.Item>
                <Menu.Separator />
                <Menu.Item isDanger>Delete</Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
