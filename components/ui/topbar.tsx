'use client'

import React from 'react'

import { IconMenu } from 'cleon-icons'
import { LayoutGroup, motion } from 'framer-motion'
import {
    Header,
    ListBox,
    ListBoxItem,
    type ListBoxItemProps,
    type ListBoxProps
} from 'react-aria-components'

import { cn, useMediaQuery } from '@/lib/utils'

import { Sheet } from './sheet'

interface TopbarProps {
    children?: React.ReactNode
    className?: string
    isResponsive?: boolean
}

const Topbar = ({ children, className, ...props }: TopbarProps) => {
    return (
        <Header
            {...props}
            className={cn(
                'sticky top-0 z-30 border-b bg-background/40 backdrop-blur-sm',
                className
            )}
        >
            <div className='mx-auto max-w-screen-2xl py-2 px-4'>
                <div className='flex items-center w-full lg:justify-normal justify-between'>
                    {children}
                </div>
            </div>
        </Header>
    )
}

interface NavigationsProps<T> extends ListBoxProps<T> {
    isResponsive?: boolean
}

const Navigations = <T extends object>({
    children,
    isResponsive = true,
    className,
    ...props
}: NavigationsProps<T>) => {
    const id = React.useId()
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return isDesktop ? (
        <LayoutGroup id={id}>
            <ListBox
                orientation='horizontal'
                aria-label={props['aria-label'] ?? 'Navigations'}
                className={cn('flex items-center gap-x-6', className)}
                layout='stack'
                {...props}
            >
                {children}
            </ListBox>
        </LayoutGroup>
    ) : (
        isResponsive && (
            <Sheet>
                <Sheet.Trigger
                    aria-label='Navigations'
                    className='btn relative whitespace-nowrap outline-none transition no-underline isolate inline-flex items-center justify-center gap-x-2 font-medium hover:brightness-110 pressed:brightness-90 [&_svg]:size-4 [&_svg]:shrink-0 disabled:cursor-default disabled:opacity-50 border bg-background text-foreground shadow-sm hover:bg-muted-foreground pressed:bg-muted size-10 shrink-0 rounded-lg'
                >
                    <IconMenu />
                </Sheet.Trigger>
                <Sheet.Content side='left' isBlurred>
                    <LayoutGroup id={id}>
                        <ListBox
                            orientation='vertical'
                            aria-label={props['aria-label'] ?? 'Navigations'}
                            className={cn('flex flex-col gap-1 mt-6', className)}
                            layout='grid'
                            {...props}
                        >
                            {children}
                        </ListBox>
                    </LayoutGroup>
                </Sheet.Content>
            </Sheet>
        )
    )
}

const Brand = ({ href, ...props }: ListBoxItemProps) => {
    const textValue = typeof props.children === 'string' ? props.children : 'Brand'
    return (
        <ListBoxItem
            href={href ?? '/'}
            className={cn(
                'relative lg:mr-8 mb-4 lg:mb-0 cursor-pointer whitespace-nowrap flex items-center transition focus:outline-none [&_[data-slot=icon]]:size-8 [&_[data-slot=icon]]:flex-shrink-0 [&_svg]:size-8 [&_svg]:flex-shrink-0',
                props?.className
            )}
            {...props}
            textValue={textValue}
        >
            {props.children}
        </ListBoxItem>
    )
}

const NavLink = ({ href, active, ...props }: ListBoxItemProps & { active?: boolean }) => {
    const textValue = typeof props.children === 'string' ? props.children : undefined
    return (
        <ListBoxItem
            href={href}
            className={cn(
                'relative whitespace-nowrap flex items-center gap-x-3 py-2 sm:pl-0 pl-4 text-sm transition-colors focus:outline-none sm:py-3',
                active ? 'text-accent' : 'text-foreground hover:text-accent',
                props?.className
            )}
            textValue={textValue}
            aria-label={props['aria-label'] ?? textValue}
            {...props}
        >
            <>
                {props.children}
                {active && (
                    <motion.span
                        layoutId='current-indicator-navlink'
                        className='absolute left-0 w-0.5 h-full lg:inset-x-0 lg:bottom-[-0.550rem] lg:h-0.5 lg:w-full rounded bg-accent'
                    />
                )}
            </>
        </ListBoxItem>
    )
}

const TopbarRight = ({ children }: { children: React.ReactNode }) => {
    return <div className='flex items-center gap-x-2 lg:ml-auto'>{children}</div>
}

Topbar.Navigation = Navigations
Topbar.Right = TopbarRight
Topbar.Link = NavLink
Topbar.Brand = Brand

export { Topbar }
