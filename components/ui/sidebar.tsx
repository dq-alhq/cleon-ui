'use client'

import * as React from 'react'

import {
    GridList,
    GridListItem,
    type GridListItemProps,
    Header,
    Link,
    type SectionProps
} from 'react-aria-components'

import { cn, useMediaQuery } from '@/lib/utils'

import { Accordion } from './accordion'
import { Sheet } from './sheet'

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
    children: React.ReactNode
    side?: 'left' | 'right'
    isStack?: boolean
    closeButton?: boolean
    isBlurred?: boolean
    className?: string
    'aria-label'?: string
    openSidebar?: boolean
    setOpenSidebar?: (open: boolean) => void
}

const Sidebar = ({
    isStack = true,
    side = 'left',
    isBlurred = true,
    closeButton = true,
    className,
    children,
    openSidebar,
    setOpenSidebar = () => {},
    ...props
}: SidebarProps) => {
    const isDesktop = useMediaQuery('(min-width: 1024px)')
    return (
        <>
            {!isDesktop ? (
                <Sheet>
                    <Sheet.Trigger className='sr-only' />
                    <Sheet.Content
                        {...{ closeButton, isStack, side, isBlurred }}
                        aria-label={props['aria-label'] ?? 'Main navigation'}
                        isOpen={openSidebar}
                        onOpenChange={() => setOpenSidebar(false)}
                        classNames={{ content: '[&_[role=dialog]]:p-0' }}
                    >
                        {children}
                    </Sheet.Content>
                </Sheet>
            ) : (
                <aside
                    className={cn(
                        'flex flex-col bg-background h-screen overflow-hidden min-w-80 border-r sticky top-0',
                        !isDesktop && 'hidden',
                        className
                    )}
                >
                    {children}
                </aside>
            )}
        </>
    )
}

const SidebarBody = ({
    children,
    className,
    ...props
}: React.HTMLProps<HTMLDivElement>) => (
    <nav
        className={cn(
            'flex flex-col overflow-y-auto p-4 space-y-2 [&>section+section]:mt-8',
            className
        )}
        {...props}
    >
        {children}
    </nav>
)

interface SidebarSectionProps<T> extends SectionProps<T> {
    title?: string
}

const SidebarSection = <T extends object>({
    className,
    ...props
}: SidebarSectionProps<T>) => {
    return (
        <div className={cn('flex text-sm flex-col gap-y-0.5 section')}>
            {props.title && (
                <Header slot='title' className='px-1 text-muted-foreground'>
                    {props.title}
                </Header>
            )}
            <GridList
                aria-label={props['aria-label'] ?? 'Section'}
                className={cn('grid gap-y-0.5', className)}
                items={props.items}
            >
                {props.children}
            </GridList>
        </div>
    )
}

interface ItemProps<T> extends GridListItemProps<T> {
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>
    badge?: string | number | undefined
    active?: boolean
    children?: React.ReactNode
    isDanger?: boolean
}

const Item = <T extends object>({
    icon: Icon,
    active,
    children,
    isDanger = false,
    className,
    ...props
}: ItemProps<T>) => {
    const itemId = React.useId()

    if (typeof children !== 'undefined') {
        const isExpanded = React.Children.toArray(children)
            .map((child) => (child as React.ReactElement).props)
            .some(
                (props) =>
                    props.active ||
                    (props.children &&
                        React.Children.toArray(props.children).some(
                            (descendant) =>
                                (descendant as React.ReactElement).props.active
                        ))
            )

        return (
            <GridListItem textValue={props.textValue} {...props}>
                <Accordion defaultExpandedKeys={isExpanded ? [0] : []} hideBorder={true}>
                    <Accordion.Item
                        currentId={0}
                        className='border-0 focus:outline-none pb-0.5'
                        key={0}
                    >
                        <Accordion.Trigger
                            className={cn(
                                'flex items-center gap-3 hover:bg-muted outline-none focus:outline-none cursor-pointer rounded-lg px-3 py-2 text-foreground duration-200 transition-all',
                                className
                            )}
                        >
                            {Icon && <Icon className='shrink-0 size-4' />}
                            {props.textValue}
                        </Accordion.Trigger>
                        <Accordion.Content className='p-0 [&_.acrt]:ml-4 [&_.subitem]:ml-4 [&_.acrt+&_.subitem]:ml-8'>
                            <GridList selectionMode='none' aria-label={props.textValue}>
                                {children}
                            </GridList>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </GridListItem>
        )
    } else {
        return (
            <GridListItem textValue={props.textValue} {...props}>
                <Link
                    key={itemId}
                    href={props.href ?? '#'}
                    className={cn(
                        'subitem flex items-center gap-3 hover:bg-muted outline-none focus:outline-none cursor-pointer rounded-lg px-3 py-2 text-foreground transition-all disabled:opacity-70 disabled:pointer-events-none',
                        {
                            'active bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground':
                                active
                        },
                        {
                            'hover:bg-danger hover:text-danger-foreground': isDanger
                        }
                    )}
                >
                    {Icon && <Icon className='shrink-0 size-4' />}
                    {props.textValue}
                </Link>
            </GridListItem>
        )
    }
}

const SidebarHeader = ({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn('flex flex-col border-b p-4 [&>section+section]:mt-2.5', className)}
        {...props}
    />
)

const SidebarFooter = ({
    className,
    ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            'flex flex-col mt-auto border-t p-4 [&>section+section]:mt-2.5',
            className
        )}
        {...props}
    />
)

Sidebar.Footer = SidebarFooter
Sidebar.Header = SidebarHeader
Sidebar.Content = SidebarBody
Sidebar.Section = SidebarSection
Sidebar.Item = Item

export { Sidebar }
