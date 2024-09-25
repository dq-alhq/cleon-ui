'use client'

import React from 'react'

import { IconGripVertical } from 'cleon-icons'
import {
    Button,
    GridListItem as GridListItemPrimitive,
    GridList as GridListPrimitive,
    type GridListItemProps,
    type GridListProps as GridListPrimitiveProps
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cn } from '@/lib/utils'

import { Checkbox } from './checkbox'

interface GridListProps<T extends object> extends GridListPrimitiveProps<T> {}

const GridList = <T extends object>({
    selectionMode = 'single',
    children,
    ...props
}: GridListProps<T>) => (
    <GridListPrimitive
        selectionMode={selectionMode}
        {...props}
        className={cn('relative overflow-auto rounded-lg border', props.className)}
    >
        {children}
    </GridListPrimitive>
)

const itemStyles = tv({
    base: 'relative -mb-px flex dragging:outline-none focus:outline-none selected:outline-none cursor-default select-none gap-3 border-y px-3 py-2 text-sm text-foreground -outline-offset-2 first:rounded-t-md first:border-t-0 last:mb-0 last:rounded-b-md last:border-b-0',
    variants: {
        isSelected: {
            false: 'hover:bg-secondary',
            true: 'z-20 border-y-primary/50 bg-primary/20'
        },
        isDisabled: {
            true: 'z-10 text-muted-foreground forced-colors:text-[GrayText]'
        }
    }
})

const GridListItem = ({ children, ...props }: GridListItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined
    return (
        <GridListItemPrimitive textValue={textValue} {...props} className={itemStyles}>
            {({ selectionMode, selectionBehavior, allowsDragging }) => (
                <>
                    {allowsDragging && (
                        <Button slot='drag'>
                            <IconGripVertical />
                        </Button>
                    )}
                    {selectionMode === 'multiple' && selectionBehavior === 'toggle' && (
                        <Checkbox slot='selection' />
                    )}
                    {children}
                </>
            )}
        </GridListItemPrimitive>
    )
}

const GridEmptyState = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div className='p-6' {...props} />
)

GridList.Item = GridListItem
GridList.EmptyState = GridEmptyState

export { GridList }
