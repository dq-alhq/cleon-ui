'use client'

import { useTheme } from '@/components/providers'
import { Avatar, Menu } from '@/components/ui'
import {
    CommandIcon,
    GaugeIcon,
    HeadphonesIcon,
    HeartIcon,
    LogOutIcon,
    MonitorCogIcon,
    MoonIcon,
    SettingsIcon,
    ShoppingBagIcon,
    SunIcon
} from 'lucide-react'

export default function MenuWithIconDemo() {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <Menu>
            <Menu.Trigger>
                <Avatar className='size-10' src='https://github.com/dq-alhq.png' />
            </Menu.Trigger>
            <Menu.Content placement='bottom' showArrow className='min-w-64'>
                <Menu.Section>
                    <Menu.Header separator>
                        <span className='block'>DQ Al-Haqqi</span>
                        <span className='font-normal text-muted-foreground'>
                            @dq-alhq
                        </span>
                    </Menu.Header>
                    <Menu.Item href='#dashboard'>
                        <GaugeIcon />
                        Dashboard
                    </Menu.Item>
                    <Menu.Item href='#settings'>
                        <SettingsIcon />
                        Settings
                    </Menu.Item>
                </Menu.Section>
                <Menu.Separator />
                <Menu.Section>
                    <Menu.Item href='#wishlist'>
                        <HeartIcon />
                        My Wishlist
                    </Menu.Item>
                    <Menu.Item href='#orders'>
                        <ShoppingBagIcon />
                        Orders
                    </Menu.Item>
                </Menu.Section>

                <Menu.Separator />
                <Menu.Item>
                    <CommandIcon />
                    Command Menu.
                </Menu.Item>
                <Menu.Sub>
                    <Menu.Item aria-label='Switch theme'>
                        {resolvedTheme === 'light' ? (
                            <SunIcon />
                        ) : resolvedTheme === 'dark' ? (
                            <MoonIcon />
                        ) : (
                            <MonitorCogIcon />
                        )}
                        Switch theme
                    </Menu.Item>
                    <Menu.Content>
                        <Menu.Item onAction={() => setTheme('system')}>
                            <MonitorCogIcon /> System
                        </Menu.Item>
                        <Menu.Item onAction={() => setTheme('dark')}>
                            <MoonIcon /> Dark
                        </Menu.Item>
                        <Menu.Item onAction={() => setTheme('light')}>
                            <SunIcon /> Light
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Sub>
                {/* <Menu.Separator /> */}
                <Menu.Item href='#contact-s'>
                    <HeadphonesIcon />
                    Contact Support
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item href='#logout'>
                    <LogOutIcon />
                    Log out
                </Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
