'use client'

import { IconDotGrid2X3 } from 'justd-icons'
import {
    composeRenderProps,
    ListBoxItem as ListBoxItemPrimitive,
    ListBox as ListBoxPrimitive,
    type ListBoxItemProps as ListBoxItemPrimitiveProps,
    type ListBoxProps as ListBoxPrimitiveProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'
import { DropdownItemDetails, DropdownSection } from './dropdown'

const listBoxStyles = tv({
    base: 'flex max-h-96 w-full min-w-72 flex-col overflow-y-auto rounded-xl border p-1 shadow-xl outline-none'
})

interface ListBoxProps<T> extends ListBoxPrimitiveProps<T> {
    className?: string
}

const ListBox = <T extends object>({
    children,
    className,
    ...props
}: ListBoxProps<T>) => (
    <ListBoxPrimitive {...props} className={listBoxStyles({ className })}>
        {children}
    </ListBoxPrimitive>
)

const listBoxItemStyles = tv({
    base: 'my-0.5 cursor-pointer rounded-md p-2 text-base outline-none transition lg:text-sm',
    variants: {
        isHovered: { true: 'bg-secondary text-secondary-foreground' },
        isFocused: {
            true: '[&_[data-slot=icon]]:text-primary-foreground [&_[data-slot=label]]:text-primary-foreground [&_.text-muted-foreground]:text-primary-foreground/80 bg-primary text-primary-foreground'
        },
        isDragging: { true: 'cursor-grabbing bg-secondary text-secondary-foreground' },
        isSelected: { true: 'bg-primary text-primary-foreground' },
        isDisabled: {
            true: 'opacity-70 cursor-default text-muted-foreground'
        }
    }
})

interface ListBoxItemProps<T extends Object> extends ListBoxItemPrimitiveProps<T> {
    className?: string
}

const ListBoxItem = <T extends object>({
    children,
    className,
    ...props
}: ListBoxItemProps<T>) => {
    const textValue = typeof children === 'string' ? children : undefined

    return (
        <ListBoxItemPrimitive
            textValue={textValue}
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
                listBoxItemStyles({
                    ...renderProps,
                    className
                })
            )}
        >
            {(values) => (
                <div className='flex items-center gap-2'>
                    <>
                        {values.allowsDragging && (
                            <IconDotGrid2X3
                                className={cn(
                                    'size-4 shrink-0 text-muted-foreground transition',
                                    values.isFocused && 'text-foreground',
                                    values.isDragging && 'text-foreground',
                                    values.isSelected && 'text-primary-foreground/70'
                                )}
                            />
                        )}
                        <div className='flex flex-col'>
                            {typeof children === 'function' ? children(values) : children}
                        </div>
                    </>
                </div>
            )}
        </ListBoxItemPrimitive>
    )
}

const ListBoxSection = DropdownSection
const ListBoxItemDetails = DropdownItemDetails

interface ListBoxPickerProps<T> extends ListBoxProps<T> {}

const ListBoxPicker = <T extends object>({
    className,
    ...props
}: ListBoxPickerProps<T>) => {
    return (
        <ListBoxPrimitive
            className={cn(
                'max-h-72 no-scrollbar overflow-auto p-1 outline-none',
                className
            )}
            {...props}
        />
    )
}

ListBox.Picker = ListBoxPicker
ListBox.Item = ListBoxItem
ListBox.ItemDetails = ListBoxItemDetails
ListBox.Section = ListBoxSection

export { ListBox, listBoxStyles }
