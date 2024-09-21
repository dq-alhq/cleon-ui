'use client'

import React, { useEffect, useId, useState } from 'react'

import {
    IconBrandAdobe,
    IconBrandCleon,
    IconBrandFramer,
    IconBrandGithub,
    IconBrandTailwind,
    IconChevronDown,
    IconColorFilter,
    IconDesktop,
    IconHome,
    IconMenu,
    IconMoon,
    IconPackages,
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
    { id: 5, label: 'Themes', url: '/themes' }
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
                <Menu.Item href='https://getjustd.com/' target='_blank'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        fill='none'
                        aria-hidden='true'
                        className='size-4'
                        data-slot='icon'
                        viewBox='0 0 24 24'
                    >
                        <path
                            fill='currentColor'
                            fillRule='evenodd'
                            d='M11.087 2h6.826c.602 0 1.087 0 1.48.032.406.033.761.103 1.09.27.523.267.948.692 1.214 1.215.168.329.238.684.27 1.09C22 5 22 5.484 22 6.086v7.381c0 .602 0 1.088-.032 1.481-.033.405-.103.76-.27 1.09a2.78 2.78 0 01-1.215 1.214c-.329.168-.684.237-1.09.27-.393.033-.878.033-1.48.033h-.357v.357c0 .602 0 1.087-.033 1.48-.033.406-.102.761-.27 1.09a2.78 2.78 0 01-1.214 1.214c-.33.168-.685.238-1.09.27-.393.033-.879.033-1.48.033H6.086c-.602 0-1.087 0-1.48-.032-.406-.033-.761-.103-1.09-.27a2.78 2.78 0 01-1.214-1.215c-.168-.329-.238-.684-.27-1.09C2 19 2 18.516 2 17.914v-7.381c0-.602 0-1.088.032-1.481.033-.405.103-.76.27-1.09a2.78 2.78 0 011.215-1.214c.329-.167.684-.237 1.09-.27.393-.033.878-.033 1.48-.033H7v-.357c0-.602 0-1.087.032-1.48.033-.406.103-.761.27-1.09a2.78 2.78 0 011.215-1.214c.329-.168.684-.238 1.09-.27C10 2 10.484 2 11.086 2zm6.802 14.444h-.333v-5.912c0-.602 0-1.088-.033-1.481-.033-.405-.102-.76-.27-1.09a2.78 2.78 0 00-1.214-1.214c-.33-.167-.685-.237-1.09-.27-.393-.033-.879-.033-1.48-.033H8.11v-.333c0-.631 0-1.072.029-1.414.027-.336.078-.53.153-.676.16-.313.415-.568.728-.728.146-.075.34-.126.676-.153.343-.028.783-.029 1.414-.029h6.778c.631 0 1.072 0 1.414.029.336.027.53.078.676.153.314.16.568.415.728.728.075.146.126.34.153.676.029.342.029.783.029 1.414v7.333c0 .632 0 1.072-.029 1.415-.027.336-.078.53-.153.675a1.67 1.67 0 01-.728.729c-.146.074-.34.125-.676.153-.343.028-.783.028-1.414.028zM5.442 18.558A1.44 1.44 0 006.5 19q.417 0 .75-.2a1.56 1.56 0 00.542-.55Q8 17.908 8 17.5a1.44 1.44 0 00-.442-1.058A1.44 1.44 0 006.5 16a1.44 1.44 0 00-1.058.442A1.44 1.44 0 005 17.5q0 .617.442 1.058'
                            clipRule='evenodd'
                        ></path>
                    </svg>
                    Just D.
                </Menu.Item>
                <Menu.Item href='https://tailwindcss.com/' target='_blank'>
                    <IconBrandTailwind />
                    Tailwind CSS
                </Menu.Item>
                <Menu.Item href='https://getjustd.com/colors' target='_blank'>
                    <IconColorFilter />
                    Colors
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
