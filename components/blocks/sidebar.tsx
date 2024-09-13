'use client'

import React from 'react'

import {
    IconAdjustments,
    IconBrandCleon,
    IconChevronDown,
    IconChevronRight,
    IconDashboard,
    IconKey,
    IconLogout,
    IconMoon,
    IconSettings,
    IconShapes2,
    IconShare3,
    IconShield,
    IconStars,
    IconSun,
    IconUser,
    IconUserCircle
} from 'cleon-icons'
import { Avatar, Button, Link, Menu, Sidebar } from 'ui'

import { useTheme } from '@/components/providers'

export default function SidebarLayout() {
    const { theme, setTheme } = useTheme()
    const [openSidebar, setOpenSidebar] = React.useState(false)
    return (
        <div className='grid lg:grid-cols-[auto_1fr]'>
            <Button
                onPress={() => setOpenSidebar(true)}
                variant='outline'
                size='icon'
                className='fixed top-3.5 left-3.5'
            >
                <IconChevronRight />
            </Button>
            <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar}>
                <Sidebar.Header>
                    <Link className='flex items-center gap-x-2' href='#'>
                        <IconBrandCleon className='size-5' />
                        <strong>CLEON</strong>
                    </Link>
                </Sidebar.Header>
                <Sidebar.Content>
                    <Sidebar.Section title='Overview'>
                        <Sidebar.Item active icon={IconDashboard} textValue='Dashboard' />
                        <Sidebar.Item icon={IconSettings} textValue='Settings'>
                            <Sidebar.Item icon={IconUserCircle} textValue='User Setting'>
                                <Sidebar.Item
                                    icon={IconUser}
                                    href='/icons'
                                    textValue='Profile'
                                />
                                <Sidebar.Item
                                    active
                                    icon={IconKey}
                                    href='/icons'
                                    textValue='Password'
                                />
                            </Sidebar.Item>
                            <Sidebar.Item
                                icon={IconAdjustments}
                                href='#'
                                textValue='Preferences'
                            />
                        </Sidebar.Item>
                    </Sidebar.Section>
                    <Sidebar.Section title='Dashboard' items={sidebarItems}>
                        {(item) => (
                            <Sidebar.Item
                                textValue={item.name}
                                id={item.name}
                                icon={item.icon}
                            >
                                {item.subItems &&
                                    item.subItems.map((item: any, i: number) => (
                                        <Sidebar.Item
                                            key={i}
                                            textValue={item.name}
                                            id={item.name}
                                            href={item.href}
                                        />
                                    ))}
                            </Sidebar.Item>
                        )}
                    </Sidebar.Section>
                    <Sidebar.Section>
                        <Sidebar.Item
                            isDanger
                            href='#'
                            icon={IconLogout}
                            textValue='Logout'
                        />
                    </Sidebar.Section>
                </Sidebar.Content>
                <Sidebar.Footer className='lg:flex lg:flex-row hidden items-center'>
                    <Menu>
                        <Button
                            variant='ghost'
                            aria-label='Profile'
                            className='group w-full justify-start flex'
                        >
                            <Avatar
                                size='sm'
                                shape='square'
                                className='-ml-1.5'
                                src='https://github.com/dq-alhq.png'
                            />
                            Diqi Al-Haqqi
                            <IconChevronDown className='right-3 absolute group-pressed:rotate-180 transition-transform' />
                        </Button>
                        <Menu.Content placement='top' className='min-w-[--trigger-width]'>
                            <Menu.Item href='#'>
                                <IconUserCircle />
                                Profile
                            </Menu.Item>
                            <Menu.Item href='#'>
                                <IconShield />
                                Security
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item
                                onAction={() =>
                                    setTheme(theme === 'light' ? 'dark' : 'light')
                                }
                            >
                                {theme === 'light' ? <IconMoon /> : <IconSun />}
                                Theme
                            </Menu.Item>
                            <Menu.Separator />
                            <Menu.Item href='#'>
                                <IconLogout />
                                Log out
                            </Menu.Item>
                        </Menu.Content>
                    </Menu>
                </Sidebar.Footer>
            </Sidebar>
            <main className='relative mt-12 md:mt-0'>
                {' '}
                <div className='p-4 md-p-6 w-full'>
                    <div className='p-4 flex justify-center items-center w-full min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-3rem)] border-2 border-dashed rounded-lg'>
                        <h1 className='text-2xl md:text-5xl text-muted-foreground text-center'>
                            PLACE YOUR CONTENT HERE
                        </h1>
                    </div>
                </div>
            </main>
        </div>
    )
}

const sidebarItems = [
    {
        icon: IconStars,
        name: 'Projects',
        subItems: [
            { name: 'Website Redesign', href: '#' },
            { name: 'New Product Launch', href: '#' },
            { name: 'Market Research', href: '#' },
            { name: 'Sales Dashboard', href: '#' },
            { name: 'Customer Feedback System', href: '#' },
            { name: 'Mobile App Development', href: '#' }
        ]
    },
    { icon: IconShapes2, name: 'Components', href: '/' },
    { icon: IconShare3, name: 'Posts', href: '#' }
]
