'use client'

import { buttonVariants, Menu } from '@/components/ui'

export default function MenuSubDemo() {
    return (
        <Menu>
            <Menu.Trigger className={buttonVariants({ variant: 'outline' })}>
                Open
            </Menu.Trigger>
            <Menu.Content placement='bottom' className='sm:min-w-48'>
                <Menu.Item>Dashboard</Menu.Item>
                <Menu.Item>Reports</Menu.Item>
                <Menu.Separator />
                <Menu.Sub>
                    <Menu.Item>Settings</Menu.Item>
                    <Menu.Content aria-labelledby='Settings'>
                        <Menu.Item>General</Menu.Item>
                        <Menu.Item>Security</Menu.Item>
                        <Menu.Item>Privacy</Menu.Item>
                        <Menu.Item>Data Sharing</Menu.Item>
                    </Menu.Content>
                </Menu.Sub>
                <Menu.Item>Help</Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
