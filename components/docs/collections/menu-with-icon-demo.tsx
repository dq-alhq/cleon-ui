'use client'

import {
    IconCommand,
    IconDashboard,
    IconDesktop,
    IconHeadphones,
    IconHeart,
    IconLogout,
    IconMoon,
    IconSettings,
    IconShoppingBag,
    IconSun
} from 'cleon-icons'

import { useTheme } from '@/components/providers'
import { Avatar, Menu } from '@/components/ui'

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
                </Menu.Section>
                <Menu.Item href='#dashboard'>
                    <IconDashboard />
                    Dashboard
                </Menu.Item>
                <Menu.Item href='#settings'>
                    <IconSettings />
                    Settings
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item href='#wishlist'>
                    <IconHeart />
                    My Wishlist
                </Menu.Item>
                <Menu.Item href='#orders'>
                    <IconShoppingBag />
                    Orders
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item>
                    <IconCommand />
                    Command Menu.
                </Menu.Item>
                <Menu.Sub>
                    <Menu.Item aria-label='Switch theme'>
                        {resolvedTheme === 'light' ? (
                            <IconSun />
                        ) : resolvedTheme === 'dark' ? (
                            <IconMoon />
                        ) : (
                            <IconDesktop />
                        )}
                        Switch theme
                    </Menu.Item>
                    <Menu.Content>
                        <Menu.Item onAction={() => setTheme('system')}>
                            <IconDesktop /> System
                        </Menu.Item>
                        <Menu.Item onAction={() => setTheme('dark')}>
                            <IconMoon /> Dark
                        </Menu.Item>
                        <Menu.Item onAction={() => setTheme('light')}>
                            <IconSun /> Light
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Sub>
                <Menu.Separator />
                <Menu.Item href='#contact-s'>
                    <IconHeadphones />
                    Contact Support
                </Menu.Item>
                <Menu.Separator />
                <Menu.Item href='#logout'>
                    <IconLogout />
                    Log out
                </Menu.Item>
            </Menu.Content>
        </Menu>
    )
}
