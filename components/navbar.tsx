'use client'

import React, { useEffect, useId, useState } from 'react'

import {
    IconBrandAdobe,
    IconBrandCleon,
    IconBrandFramer,
    IconBrandGithub,
    IconBrandTailwind,
    IconChevronDown,
    IconColorSwatch,
    IconDesktop,
    IconHome,
    IconMenu,
    IconMoon,
    IconPackages,
    IconPaint,
    IconSearch,
    IconShapes2,
    IconSun,
    IconTemplate
} from 'cleon-icons'
import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Collection, Link as LinkPrimitive, type LinkProps } from 'react-aria-components'

import { CommandPalette, type OpenCloseProps } from '@/components/command-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import {
    Button,
    buttonVariants,
    Keyboard,
    Link,
    Menu,
    Separator,
    Sheet
} from '@/components/ui'
import { cn, useMediaQuery } from '@/lib/utils'

import { Aside } from './aside'
import { useTheme } from './providers'

export const menuItems = [
    { id: 1, label: 'Home', url: '/' },
    { id: 2, label: 'Components', url: '/docs/getting-started/introduction' },
    { id: 3, label: 'Blocks', url: '/blocks' },
    { id: 4, label: 'Icons', url: '/icons' },
    { id: 5, label: 'Colors', url: '/colors' },
    { id: 6, label: 'Themes', url: '/themes' }
]

export function Navbar() {
    const id = useId()
    const pathname = usePathname()

    const [open, setOpen] = React.useState(false)

    return (
        <>
            <CommandPalette setOpen={setOpen} open={open} />
            <LayoutGroup id={`navigation-${id}`}>
                <div className='sticky top-0 z-30 hidden overflow-hidden pb-1 lg:block'>
                    <nav className='border-b bg-background/60 py-2 backdrop-blur-xl'>
                        <div className='mx-auto max-w-screen-2xl px-4'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-x-6'>
                                    <NavbarDropdown />
                                    <Separator orientation='vertical' className='h-6' />
                                    <Collection items={menuItems}>
                                        <NavLink isActive={pathname === '/'} href='/'>
                                            Home
                                        </NavLink>
                                        <NavLink
                                            isActive={pathname?.startsWith('/docs')}
                                            href='/docs/getting-started/introduction'
                                        >
                                            Components
                                        </NavLink>
                                        <NavLink
                                            isActive={pathname?.startsWith('/blocks')}
                                            href='/blocks'
                                        >
                                            Blocks
                                        </NavLink>
                                        <NavLink
                                            isActive={pathname?.startsWith('/icons')}
                                            href='/icons'
                                        >
                                            Icons
                                        </NavLink>
                                        <NavLink
                                            isActive={pathname?.startsWith('/colors')}
                                            href='/colors'
                                        >
                                            Colors
                                        </NavLink>
                                        <NavLink
                                            isActive={pathname?.startsWith('/themes')}
                                            href='/themes'
                                        >
                                            Themes
                                        </NavLink>
                                    </Collection>
                                </div>

                                <div className='flex items-center gap-x-2'>
                                    <>
                                        <LinkPrimitive
                                            target='_blank'
                                            href='https://github.com/dq-alhq/cleon-ui'
                                            className={buttonVariants({
                                                variant: 'outline',
                                                size: 'icon'
                                            })}
                                        >
                                            <IconBrandGithub />
                                        </LinkPrimitive>
                                        <Button
                                            className='flex-shrink-0'
                                            onPress={() =>
                                                setOpen((open: boolean) => !open)
                                            }
                                            variant='outline'
                                            aria-label='Open command palette'
                                        >
                                            <IconSearch />
                                            <Keyboard
                                                className='-mr-2 [&_kbd]:min-w-[3ch]'
                                                keys='⌘K'
                                            />
                                        </Button>
                                        <ThemeToggle />
                                    </>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </LayoutGroup>
            <ResponsiveAside open={open} setOpen={setOpen} />
        </>
    )
}

export function NavLink({
    href,
    isActive,
    ...props
}: LinkProps & { isActive?: boolean }) {
    return (
        <Link
            href={href}
            className={cn(
                'relative whitespace-nowrap flex items-center gap-x-3 py-2 text-sm transition-colors focus:outline-none sm:py-3',
                isActive ? 'text-primary' : 'text-foreground hover:text-primary',
                props.className
            )}
            {...props}
        >
            <>
                {props.children}
                {isActive && (
                    <motion.span
                        layoutId='current-indicator-navlink'
                        className='absolute inset-x-0 bottom-[-0.550rem] h-0.5 w-full rounded bg-primary'
                    />
                )}
            </>
        </Link>
    )
}

export function ResponsiveAside({ open, setOpen }: OpenCloseProps) {
    const id = useId()
    const [openAside, setOpenAside] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setOpenAside(false)
    }, [pathname])

    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return (
        <nav className='z-30 lg:hidden h-14 bg-background/60 backdrop-blur-xl rounded-b-lg sticky top-0'>
            {!isDesktop && <CommandPalette setOpen={setOpen} open={open} />}
            <div className={cn('-mb-2 flex items-center justify-between pl-4 pr-2 pt-2')}>
                <Button
                    aria-label='Open Menu'
                    className='-ml-2 [&_[data-slot=icon]]:text-foreground'
                    variant='outline'
                    size='icon'
                    onPress={() => setOpenAside((openAside) => !openAside)}
                >
                    <IconMenu />
                </Button>
                <Link
                    className='rounded focus:outline-none focus:ring-1 focus:ring-primary/20'
                    href='/'
                    aria-label='Logo'
                >
                    <IconBrandCleon className='size-7' />
                </Link>
                <div className='flex items-center gap-x-1'>
                    <LinkPrimitive
                        target='_blank'
                        href='https://github.com/dq-alhq/cleon-ui'
                        className={buttonVariants({
                            variant: 'outline',
                            size: 'icon'
                        })}
                    >
                        <IconBrandGithub />
                    </LinkPrimitive>
                    <Button
                        // @ts-expect-error
                        onPress={() => setOpen((open: boolean) => !open)}
                        size='icon'
                        variant='outline'
                        aria-label='Open command palette'
                        className='flex-shrink-0'
                    >
                        <IconSearch />
                        <Keyboard className='-mr-2 [&_kbd]:min-w-[3ch]' keys='⌘K' />
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
            {!isDesktop && (
                <Sheet isOpen={openAside} onOpenChange={setOpenAside}>
                    <Sheet.Trigger className='sr-only'>Open</Sheet.Trigger>
                    <Sheet.Content
                        classNames={{ content: 'w-[19rem]' }}
                        side='left'
                        closeButton={true}
                    >
                        <Sheet.Header className='mb-4 flex flex-row justify-between py-2'>
                            <NavbarDropdown />
                        </Sheet.Header>
                        <Sheet.Body className='px-4'>
                            <LayoutGroup id={id}>
                                <Aside />
                            </LayoutGroup>
                        </Sheet.Body>
                    </Sheet.Content>
                </Sheet>
            )}
        </nav>
    )
}

export function NavbarDropdown() {
    const { theme, setTheme } = useTheme()
    return (
        <Menu>
            <Button
                aria-label='Menu'
                variant='ghost'
                className='group -ml-1 [&_svg]:size-4'
            >
                <span className='flex items-center gap-x-2'>
                    <IconBrandCleon className='-ml-1 size-6' />
                    <span className='font-mono text-base tracking-tight sm:text-sm'>
                        Cleon UI
                    </span>
                    <IconChevronDown className='-mr-2 ml-1 text-muted-foreground transition duration-300 group-hover:text-foreground group-pressed:rotate-180 group-pressed:text-foreground' />
                    <span className='sr-only'>Open menu</span>
                </span>
            </Button>
            <Menu.Content placement='bottom' className='md:w-64'>
                <Menu.Item href='/' target='_blank'>
                    <IconHome />
                    Home
                </Menu.Item>
                <Menu.Item href='/docs/getting-started/introduction'>
                    <IconPackages />
                    Components
                </Menu.Item>
                <Menu.Item href='/blocks'>
                    <IconTemplate />
                    Blocks
                </Menu.Item>
                <Menu.Item href='/blocks'>
                    <IconShapes2 />
                    Icons
                </Menu.Item>
                <Menu.Item href='/colors'>
                    <IconColorSwatch />
                    Colors
                </Menu.Item>
                <Menu.Item href='/themes'>
                    <IconPaint />
                    Themes
                </Menu.Item>
                <Menu.Separator />
                <Menu.Header separator>Refs</Menu.Header>
                <Menu.Item href='https://github.com/dq-alhq' target='_blank'>
                    <IconBrandGithub />
                    Github
                </Menu.Item>
                <Menu.Item
                    href='https://react-spectrum.adobe.com/react-aria/components.html'
                    target='_blank'
                >
                    <IconBrandAdobe />
                    RAC
                </Menu.Item>
                <Menu.Item href='https://tailwindcss.com/' target='_blank'>
                    <IconBrandTailwind />
                    Tailwind CSS
                </Menu.Item>
                <Menu.Item href='https://www.framer.com/motion/' target='_blank'>
                    <IconBrandFramer />
                    Framer Motion
                </Menu.Item>
                <Menu.Separator />
                <Menu.Sub>
                    <Menu.Item aria-label='Switch Theme'>
                        {theme === 'system' ? (
                            <IconDesktop />
                        ) : theme === 'dark' ? (
                            <IconMoon />
                        ) : (
                            <IconSun />
                        )}
                        <span>Switch Theme</span>
                    </Menu.Item>
                    <Menu.Content aria-labelledby='switch-theme'>
                        <Menu.Item onAction={() => setTheme('system')}>
                            <IconDesktop />
                            <span>System</span>
                        </Menu.Item>
                        <Menu.Item onAction={() => setTheme('dark')}>
                            <IconMoon />
                            <span>Dark</span>
                        </Menu.Item>
                        <Menu.Item onAction={() => setTheme('light')}>
                            <IconSun />
                            <span>Light</span>
                        </Menu.Item>
                    </Menu.Content>
                </Menu.Sub>
            </Menu.Content>
        </Menu>
    )
}
