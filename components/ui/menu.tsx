'use client'

import * as React from 'react'

import { CheckIcon, ChevronRightIcon, CircleIcon } from 'lucide-react'
import {
    Button,
    composeRenderProps,
    Header,
    MenuItem as MenuItemPrimitive,
    Menu as MenuPrimitive,
    MenuTrigger as MenuTriggerPrimitive,
    Separator,
    SubmenuTrigger as SubmenuTriggerPrimitive,
    type ButtonProps,
    type MenuItemProps as MenuItemPrimitiveProps,
    type MenuProps as MenuPrimitiveProps,
    type PopoverProps,
    type SeparatorProps
} from 'react-aria-components'
import { tv, type VariantProps } from 'tailwind-variants'

import { cn } from '@/lib/utils'
import { DropdownItemDetails, dropdownItemStyles, DropdownSection } from './dropdown'
import { Keyboard } from './keyboard'
import { Popover } from './popover'

interface MenuContextProps {
    respectScreen: boolean
}

const MenuContext = React.createContext<MenuContextProps>({ respectScreen: true })

export const useMenuContext = () => React.useContext(MenuContext)

interface MenuProps extends MenuTriggerProps {
    respectScreen?: boolean
}

const Menu = ({ respectScreen = true, ...props }: MenuProps) => {
    return (
        <MenuContext.Provider value={{ respectScreen }}>
            <MenuTriggerPrimitive {...props}>
                <>{props.children}</>
            </MenuTriggerPrimitive>
        </MenuContext.Provider>
    )
}

const SubMenu = ({ delay = 0, ...props }) => (
    <SubmenuTriggerPrimitive {...props} delay={delay}>
        {props.children}
    </SubmenuTriggerPrimitive>
)

const MenuSection = DropdownSection
const MenuItemDetails = DropdownItemDetails

const menuStyles = tv({
    slots: {
        menu: 'menu max-h-[calc(var(--visual-viewport-height)-10rem)] no-scrollbar sm:max-h-[inherit] overflow-auto rounded-xl p-1 outline outline-0 [clip-path:inset(0_0_0_0_round_calc(var(--radius)-2px))]',
        popover: 'z-50 min-w-40 p-0 outline-none shadow-lg',
        trigger:
            'inline text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary pressed:outline-none'
    }
})

const { menu, popover, trigger } = menuStyles()

interface MenuTriggerProps extends ButtonProps {
    className?: string
}

const MenuTrigger = ({ className, ...props }: MenuTriggerProps) => (
    <Button className={trigger({ className })} {...props} />
)

export interface MenuContentProps<T>
    extends Omit<PopoverProps, 'children' | 'style'>,
        MenuPrimitiveProps<T> {
    className?: string
    popoverClassName?: string
    showArrow?: boolean
    respectScreen?: boolean
}

const MenuContent = <T extends object>({
    className,
    showArrow = false,
    popoverClassName,
    offset = 4,
    ...props
}: MenuContentProps<T>) => {
    const { respectScreen } = useMenuContext()
    return (
        <Popover.Content
            respectScreen={respectScreen}
            showArrow={showArrow}
            className={popover({ className: popoverClassName })}
            {...props}
        >
            <MenuPrimitive className={menu({ className })} {...props} />
        </Popover.Content>
    )
}

interface MenuItemProps
    extends Omit<MenuItemPrimitiveProps, 'isDanger'>,
        VariantProps<typeof dropdownItemStyles> {
    isDanger?: boolean
}

const MenuItem = ({ className, isDanger = false, children, ...props }: MenuItemProps) => {
    return (
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
                    {values.hasSubmenu && (
                        <ChevronRightIcon className='gpfw ml-auto size-3.5' />
                    )}
                </>
            )}
        </MenuItemPrimitive>
    )
}

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
            'p-2 text-base font-semibold sm:text-sm',
            inset && 'pl-8',
            separator && '-mx-1 border-b border-b-border px-3 pb-[0.625rem]',
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
                <span className='ml-auto flex size-2.5 items-center animate-in justify-center'>
                    {values.isSelected && (
                        <CircleIcon className='size-2.5 fill-current' />
                    )}
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
Menu.ItemDetails = MenuItemDetails
Menu.Sub = SubMenu

export { Menu, type MenuItemProps }
