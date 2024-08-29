'use client'

import {
    composeRenderProps,
    GridList,
    GridListItem,
    type GridListItemProps,
    type GridListProps
} from 'react-aria-components'
import type { VariantProps } from 'tailwind-variants'
import { tv } from 'tailwind-variants'

import { Checkbox } from './checkbox'
import { Description, Label } from './field'

const choiceboxStyles = tv({
    base: 'grid',
    variants: {
        columns: {
            1: 'sm:grid-cols-1',
            2: 'sm:grid-cols-2',
            3: 'sm:grid-cols-3',
            4: 'sm:grid-cols-4',
            5: 'sm:grid-cols-5',
            6: 'sm:grid-cols-6'
        },
        gap: {
            2: 'gap-2',
            4: 'gap-4',
            6: 'gap-6'
        }
    },
    defaultVariants: {
        columns: 2,
        gap: 6
    }
})

interface ChoiceboxProps<T extends object>
    extends GridListProps<T>,
        VariantProps<typeof choiceboxStyles> {
    className?: string
}

const Choicebox = <T extends object>({
    columns,
    gap,
    className,
    selectionMode = 'multiple',
    ...props
}: ChoiceboxProps<T>) => {
    return (
        <GridList
            layout={columns === 1 ? 'stack' : 'grid'}
            selectionMode={selectionMode}
            className={choiceboxStyles({
                columns,
                gap,
                className
            })}
            {...props}
        />
    )
}

const choiceboxItemStyles = tv({
    base: 'rounded-lg transition duration-200 cursor-pointer focus:ring focus:ring-4 focus:ring-accent/20 border outline-none p-4 [&_[slot=title]]:font-medium',
    variants: {
        isSelected: {
            true: [
                'z-20 bg-accent/10 hover:bg-accent/10 border-accent',
                '[&_[slot=title]]:text-accent',
                '[&_[slot=description]]:text-accent/50'
            ]
        },
        isFocused: {
            true: 'border-accent/70'
        },
        isHovered: {
            true: 'bg-muted/50'
        },
        isDisabled: {
            true: 'z-10 cursor-default opacity-80 [&_[slot=title]]:text-muted-foreground forced-colors:text-[GrayText]'
        }
    }
})

interface ChoiceboxItemProps
    extends GridListItemProps,
        VariantProps<typeof choiceboxItemStyles> {
    title: string
    description?: string
}

const ChoiceboxItem = ({ children, className, ...props }: ChoiceboxItemProps) => {
    const textValue = typeof children === 'string' ? children : undefined
    return (
        <GridListItem
            textValue={textValue}
            {...props}
            className={composeRenderProps(className, (className, renderProps) =>
                choiceboxItemStyles({
                    ...renderProps,
                    className
                })
            )}
        >
            {(values) => (
                <div className='flex items-center w-full justify-between gap-2'>
                    <div className='pr-8 flex flex-col'>
                        <Label slot='title' htmlFor={textValue}>
                            {props.title}
                        </Label>
                        {props.description && (
                            <Description>{props.description}</Description>
                        )}
                    </div>
                    <>
                        {values.selectionMode === 'multiple' &&
                            values.selectionBehavior === 'toggle' && (
                                <Checkbox slot='selection' />
                            )}
                    </>
                </div>
            )}
        </GridListItem>
    )
}

Choicebox.Item = ChoiceboxItem
export { Choicebox }
