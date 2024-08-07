'use client'

import * as React from 'react'

import { CheckIcon, ChevronRightIcon } from 'lucide-react'
import {
    Button,
    composeRenderProps,
    Header,
    MenuItem as MenuItemPrimitive,
    Menu as MenuPrimitive,
    MenuTrigger as MenuTriggerPrimitive,
    OverlayArrow,
    Popover,
    PopoverContext,
    Separator,
    SubmenuTrigger as SubmenuTriggerPrimitive,
    useSlottedContext,
    type ButtonProps,
    type MenuItemProps as MenuItemPrimitiveProps,
    type MenuProps,
    type MenuTriggerProps,
    type PopoverProps,
    type SeparatorProps
} from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'
import { dropdownItemStyles, DropdownSection } from './dropdown'
import { Keyboard } from './keyboard'

interface MenuSubComponents {
    CheckboxItem: typeof MenuCheckboxItem
    Content: typeof MenuContent
    Header: typeof MenuHeader
    Item: typeof MenuItem
    Keyboard: typeof MenuKeyboard
    RadioItem: typeof MenuRadioItem
    Section: typeof MenuSection
    Separator: typeof MenuSeparator
    Trigger: typeof MenuTrigger
    SubTrigger: typeof SubmenuTrigger
}

type MenuComponent = React.FC<MenuTriggerProps> & MenuSubComponents

const Menu: MenuComponent = (props: MenuTriggerProps) => (
    <MenuTriggerPrimitive {...props}>{props.children}</MenuTriggerPrimitive>
)

const MenuTrigger = ({ className, ...props }: ButtonProps) => (
    <Button
        aria-label='Open Menu'
        className={cn(
            'inline text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-500 pressed:outline-none',
            className
        )}
        {...props}
    />
)

const SubmenuTrigger = SubmenuTriggerPrimitive

const MenuSection = DropdownSection

export interface MenuContentProps<T>
    extends Omit<PopoverProps, 'children' | 'style'>,
        MenuProps<T> {
    className?: string
    popoverClassName?: string
    showArrow?: boolean
}

const MenuContent = <T extends object>({
    className,
    showArrow = false,
    popoverClassName,
    offset = 4,
    ...props
}: MenuContentProps<T>) => {
    const popoverContext = useSlottedContext(PopoverContext)!
    const isSubmenu = popoverContext?.trigger === 'SubmenuTrigger'
    let currentOffset = showArrow ? 12 : 8
    currentOffset = isSubmenu ? currentOffset - 6 : currentOffset
    return (
        <Popover
            offset={currentOffset}
            className={cn(
                'z-50 min-w-40 rounded-xl border bg-background text-foreground outline-none entering:animate-in exiting:animate-out entering:fade-in-0 exiting:fade-out-0 exiting:zoom-out-95 data-[placement=bottom]:slide-in-from-top-2 data-[placement=left]:slide-in-from-right-2 data-[placement=right]:slide-in-from-left-2 data-[placement=top]:slide-in-from-bottom-2',
                popoverClassName
            )}
            {...props}
        >
            {showArrow && (
                <OverlayArrow className='group'>
                    <svg
                        width={12}
                        height={12}
                        viewBox='0 0 12 12'
                        className='block fill-background stroke-border group-placement-left:-rotate-90 group-placement-right:rotate-90 group-placement-bottom:rotate-180 forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]'
                    >
                        <path d='M0 0 L6 6 L12 0' />
                    </svg>
                </OverlayArrow>
            )}
            <MenuPrimitive
                className={cn(
                    'max-h-[inherit] no-scrollbar overflow-auto rounded-xl p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]',
                    className
                )}
                {...props}
            />
        </Popover>
    )
}

interface MenuItemProps
    extends Omit<MenuItemPrimitiveProps, 'isDanger'>,
        VariantProps<typeof dropdownItemStyles> {
    isDanger?: boolean
}

const MenuItem = ({ className, isDanger = false, children, ...props }: MenuItemProps) => (
    <MenuItemPrimitive
        className={composeRenderProps(className, (className, renderProps) =>
            dropdownItemStyles({
                ...renderProps,
                className
            })
        )}
        data-danger={isDanger ? 'true' : undefined}
        {...props}
    >
        {(values) => (
            <>
                {typeof children === 'function' ? children(values) : children}
                {values.hasSubmenu && <ChevronRightIcon className='ml-auto size-3.5' />}
            </>
        )}
    </MenuItemPrimitive>
)

export interface MenuHeaderProps extends React.ComponentProps<typeof Header> {
    inset?: boolean
    separator?: boolean
}

const MenuHeader = ({
    className,
    inset,
    separator = false,
    ...props
}: MenuHeaderProps) => (
    <Header
        className={cn(
            'px-2 py-1.5 text-base font-semibold sm:text-sm',
            inset && 'pl-8',
            separator && '-mx-1 mb-1 border-b border-b-border px-3 pb-[0.625rem]',
            className
        )}
        {...props}
    />
)

const MenuSeparator = ({ className, ...props }: SeparatorProps) => (
    <Separator className={cn('-mx-1 my-1 h-px ms bg-muted', className)} {...props} />
)

const MenuKeyboard = Keyboard

const MenuCheckboxItem = ({ className, children, ...props }: MenuItemProps) => (
    <MenuItem className={cn('pr-2', className)} {...props}>
        {(values) => (
            <>
                {typeof children === 'function' ? children(values) : children}
                <span className='ml-auto flex size-4 items-center animate-in justify-center'>
                    {values.isSelected && <CheckIcon className='size-4' />}
                </span>
            </>
        )}
    </MenuItem>
)

const MenuRadioItem = ({ className, children, ...props }: MenuItemProps) => (
    <MenuItem className={cn('pr-2', className)} {...props}>
        {(values) => (
            <>
                {typeof children === 'function' ? children(values) : children}
                <span className='ml-auto flex size-4 items-center animate-in justify-center'>
                    {values.isSelected && <CheckIcon className='size-4' />}
                </span>
            </>
        )}
    </MenuItem>
)

Menu.CheckboxItem = MenuCheckboxItem
Menu.Content = MenuContent
Menu.Header = MenuHeader
Menu.Item = MenuItem
Menu.Keyboard = MenuKeyboard
Menu.RadioItem = MenuRadioItem
Menu.Section = MenuSection
Menu.Separator = MenuSeparator
Menu.Trigger = MenuTrigger
Menu.SubTrigger = SubmenuTrigger

export { Menu, type MenuItemProps }
